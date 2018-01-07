package com.callippus.hr.Demo.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Propellant_type_master.
 */
@Entity
@Table(name = "PROPELLANT_TYPE_MASTER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Propellant_type_master implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "propellant_name", nullable = false)
    private String propellant_name;
    
   	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPropellant_name() {
        return propellant_name;
    }

    public void setPropellant_name(String propellant_name) {
        this.propellant_name = propellant_name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Propellant_type_master propellant_type_master = (Propellant_type_master) o;

        if ( ! Objects.equals(id, propellant_type_master.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Propellant_type_master{" +
                "id=" + id +
                ", propellant_name='" + propellant_name + "'" +
                '}';
    }
}