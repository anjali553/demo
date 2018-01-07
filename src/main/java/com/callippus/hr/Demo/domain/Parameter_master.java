package com.callippus.hr.Demo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


/**
 * A Parameter_master.
 */
@Entity
@Table(name = "PARAMETER_MASTER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parameter_master implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    
    @Column(name = "parameter_name")
    private String parameter_name;


    
    @Column(name = "has_details")
    private Boolean has_details;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParameter_name() {
        return parameter_name;
    }

    public void setParameter_name(String parameter_name) {
        this.parameter_name = parameter_name;
    }

    public Boolean getHas_details() {
        return has_details;
    }

    public void setHas_details(Boolean has_details) {
        this.has_details = has_details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Parameter_master parameter_master = (Parameter_master) o;

        if ( ! Objects.equals(id, parameter_master.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Parameter_master{" +
                "id=" + id +
                ", parameter_name='" + parameter_name + "'" +
                ", has_details='" + has_details + "'" +
                '}';
    }
}
