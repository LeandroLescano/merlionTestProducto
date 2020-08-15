package merliontechs.web.rest;

import merliontechs.domain.Providers;
import merliontechs.repository.ProvidersRepository;
import merliontechs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link merliontechs.domain.Providers}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProvidersResource {

    private final Logger log = LoggerFactory.getLogger(ProvidersResource.class);

    private static final String ENTITY_NAME = "providers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProvidersRepository providersRepository;

    public ProvidersResource(ProvidersRepository providersRepository) {
        this.providersRepository = providersRepository;
    }

    /**
     * {@code POST  /providers} : Create a new providers.
     *
     * @param providers the providers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new providers, or with status {@code 400 (Bad Request)} if the providers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/providers")
    public ResponseEntity<Providers> createProviders(@RequestBody Providers providers) throws URISyntaxException {
        log.debug("REST request to save Providers : {}", providers);
        if (providers.getId() != null) {
            throw new BadRequestAlertException("A new providers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Providers result = providersRepository.save(providers);
        return ResponseEntity.created(new URI("/api/providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /providers} : Updates an existing providers.
     *
     * @param providers the providers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated providers,
     * or with status {@code 400 (Bad Request)} if the providers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the providers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/providers")
    public ResponseEntity<Providers> updateProviders(@RequestBody Providers providers) throws URISyntaxException {
        log.debug("REST request to update Providers : {}", providers);
        if (providers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Providers result = providersRepository.save(providers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, providers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /providers} : get all the providers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of providers in body.
     */
    @GetMapping("/providers")
    public List<Providers> getAllProviders() {
        log.debug("REST request to get all Providers");
        return providersRepository.findAll();
    }

    /**
     * {@code GET  /providers/:id} : get the "id" providers.
     *
     * @param id the id of the providers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the providers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/providers/{id}")
    public ResponseEntity<Providers> getProviders(@PathVariable Long id) {
        log.debug("REST request to get Providers : {}", id);
        Optional<Providers> providers = providersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(providers);
    }

    /**
     * {@code DELETE  /providers/:id} : delete the "id" providers.
     *
     * @param id the id of the providers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/providers/{id}")
    public ResponseEntity<Void> deleteProviders(@PathVariable Long id) {
        log.debug("REST request to delete Providers : {}", id);
        providersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
