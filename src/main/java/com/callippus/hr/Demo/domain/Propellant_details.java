package com.callippus.hr.Demo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Propellant_details.
 */
@Entity
@Table(name = "PROPELLANT_DETAILS")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Propellant_details implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "weight", precision=10, scale=2, nullable = false)
    private BigDecimal weight;
    
    @NotNull
    @Column(name = "propellant_type", nullable = false)
    private String propellant_type;

    @ManyToOne
    private Test_batch test_batch;

    /*@ManyToOne
    private Propellant_type_master propellant_type_master;*/

    @ManyToOne
    private Uom weight_uom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPropellant_type() {
		return propellant_type;
	}

	public void setPropellant_type(String propellant_type) {
		this.propellant_type = propellant_type;
	}

	public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public Test_batch getTest_batch() {
        return test_batch;
    }

    public void setTest_batch(Test_batch test_batch) {
        this.test_batch = test_batch;
    }

    /*public Propellant_type_master getPropellant_type_master() {
        return propellant_type_master;
    }

    public void setPropellant_type_master(Propellant_type_master propellant_type_master) {
        this.propellant_type_master = propellant_type_master;
    }*/

    public Uom getWeight_uom() {
        return weight_uom;
    }

    public void setWeight_uom(Uom uom) {
        this.weight_uom = uom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Propellant_details propellant_details = (Propellant_details) o;

        if ( ! Objects.equals(id, propellant_details.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Propellant_details{" +
                "id=" + id +
                ", propellant_type='" + propellant_type + "'" +
                ", weight='" + weight + "'" +
                '}';
    }
}
