package com.callippus.hr.Demo.web.repository;

import com.callippus.hr.Demo.domain.Uom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Uom entity.
 */
public interface UomRepository extends JpaRepository<Uom,Long> {

	//@Query("select u from Uom u where u.parameter_master.id in (1,2,3,4,5,6,7)")
	@Query("select u from Uom u where u.parameter_master.id in (16)")
	Page<Uom> findUomsByFilter(Pageable generatePageRequest);

}
