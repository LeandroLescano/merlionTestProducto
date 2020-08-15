package merliontechs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import merliontechs.domain.enumeration.State;

/**
 * A Sales.
 */
@Entity
@Table(name = "sales")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sales implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private State state;

    @Column(name = "delivered_date")
    private LocalDate deliveredDate;

    @Column(name = "final_delivered_date")
    private LocalDate finalDeliveredDate;

    @Column(name = "amount_paid")
    private Float amountPaid;

    @Column(name = "full_payment")
    private Float fullPayment;

    @ManyToOne
    @JsonIgnoreProperties(value = "sales", allowSetters = true)
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public State getState() {
        return state;
    }

    public Sales state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public LocalDate getDeliveredDate() {
        return deliveredDate;
    }

    public Sales deliveredDate(LocalDate deliveredDate) {
        this.deliveredDate = deliveredDate;
        return this;
    }

    public void setDeliveredDate(LocalDate deliveredDate) {
        this.deliveredDate = deliveredDate;
    }

    public LocalDate getFinalDeliveredDate() {
        return finalDeliveredDate;
    }

    public Sales finalDeliveredDate(LocalDate finalDeliveredDate) {
        this.finalDeliveredDate = finalDeliveredDate;
        return this;
    }

    public void setFinalDeliveredDate(LocalDate finalDeliveredDate) {
        this.finalDeliveredDate = finalDeliveredDate;
    }

    public Float getAmountPaid() {
        return amountPaid;
    }

    public Sales amountPaid(Float amountPaid) {
        this.amountPaid = amountPaid;
        return this;
    }

    public void setAmountPaid(Float amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Float getFullPayment() {
        return fullPayment;
    }

    public Sales fullPayment(Float fullPayment) {
        this.fullPayment = fullPayment;
        return this;
    }

    public void setFullPayment(Float fullPayment) {
        this.fullPayment = fullPayment;
    }

    public Product getProduct() {
        return product;
    }

    public Sales product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sales)) {
            return false;
        }
        return id != null && id.equals(((Sales) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sales{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", deliveredDate='" + getDeliveredDate() + "'" +
            ", finalDeliveredDate='" + getFinalDeliveredDate() + "'" +
            ", amountPaid=" + getAmountPaid() +
            ", fullPayment=" + getFullPayment() +
            "}";
    }
}
