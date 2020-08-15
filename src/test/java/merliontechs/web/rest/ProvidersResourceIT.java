package merliontechs.web.rest;

import merliontechs.TestApp;
import merliontechs.domain.Providers;
import merliontechs.repository.ProvidersRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProvidersResource} REST controller.
 */
@SpringBootTest(classes = TestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProvidersResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProvidersRepository providersRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProvidersMockMvc;

    private Providers providers;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Providers createEntity(EntityManager em) {
        Providers providers = new Providers()
            .name(DEFAULT_NAME);
        return providers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Providers createUpdatedEntity(EntityManager em) {
        Providers providers = new Providers()
            .name(UPDATED_NAME);
        return providers;
    }

    @BeforeEach
    public void initTest() {
        providers = createEntity(em);
    }

    @Test
    @Transactional
    public void createProviders() throws Exception {
        int databaseSizeBeforeCreate = providersRepository.findAll().size();
        // Create the Providers
        restProvidersMockMvc.perform(post("/api/providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isCreated());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeCreate + 1);
        Providers testProviders = providersList.get(providersList.size() - 1);
        assertThat(testProviders.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProvidersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = providersRepository.findAll().size();

        // Create the Providers with an existing ID
        providers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvidersMockMvc.perform(post("/api/providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isBadRequest());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        // Get all the providersList
        restProvidersMockMvc.perform(get("/api/providers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(providers.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        // Get the providers
        restProvidersMockMvc.perform(get("/api/providers/{id}", providers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(providers.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingProviders() throws Exception {
        // Get the providers
        restProvidersMockMvc.perform(get("/api/providers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        int databaseSizeBeforeUpdate = providersRepository.findAll().size();

        // Update the providers
        Providers updatedProviders = providersRepository.findById(providers.getId()).get();
        // Disconnect from session so that the updates on updatedProviders are not directly saved in db
        em.detach(updatedProviders);
        updatedProviders
            .name(UPDATED_NAME);

        restProvidersMockMvc.perform(put("/api/providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProviders)))
            .andExpect(status().isOk());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeUpdate);
        Providers testProviders = providersList.get(providersList.size() - 1);
        assertThat(testProviders.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProviders() throws Exception {
        int databaseSizeBeforeUpdate = providersRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvidersMockMvc.perform(put("/api/providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(providers)))
            .andExpect(status().isBadRequest());

        // Validate the Providers in the database
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProviders() throws Exception {
        // Initialize the database
        providersRepository.saveAndFlush(providers);

        int databaseSizeBeforeDelete = providersRepository.findAll().size();

        // Delete the providers
        restProvidersMockMvc.perform(delete("/api/providers/{id}", providers.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Providers> providersList = providersRepository.findAll();
        assertThat(providersList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
