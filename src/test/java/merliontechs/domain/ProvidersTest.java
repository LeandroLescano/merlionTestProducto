package merliontechs.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import merliontechs.web.rest.TestUtil;

public class ProvidersTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Providers.class);
        Providers providers1 = new Providers();
        providers1.setId(1L);
        Providers providers2 = new Providers();
        providers2.setId(providers1.getId());
        assertThat(providers1).isEqualTo(providers2);
        providers2.setId(2L);
        assertThat(providers1).isNotEqualTo(providers2);
        providers1.setId(null);
        assertThat(providers1).isNotEqualTo(providers2);
    }
}
