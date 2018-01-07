package com.callippus.hr.Demo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Test_batch.
 */
@Entity
@Table(name = "TEST_BATCH")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Test_batch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "test_btach_name", nullable = false)
    private String test_btach_name;

   
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTest_btach_name() {
		return test_btach_name;
	}

	public void setTest_btach_name(String test_btach_name) {
		this.test_btach_name = test_btach_name;
	}

   
	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Test_batch test_batch = (Test_batch) o;

        if ( ! Objects.equals(id, test_batch.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Test_batch{" +
                "id=" + id +
                ", test_btach_name='" + test_btach_name + "'" +
                '}';
    }
}
