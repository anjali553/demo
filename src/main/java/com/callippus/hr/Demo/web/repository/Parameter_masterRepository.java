/**package com.callippus.web.repository;

import com.callippus.web.domain.Parameter_master;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Parameter_master entity.
 */
/**public interface Parameter_masterRepository extends JpaRepository<Parameter_master,Long> {
	/*@Query("select pm from Parameter_master pm, Test_parameter tp where pm.id=tp.parameter_master.id and tp.test_batch.id=:test_batch_id and pm.has_details=:has_details")
 	Page<Parameter_master> findTestBatch(Pageable pageable, @Param("test_batch_id") Long test_batch_id, @Param("has_details") Boolean has_details);*/
 	
 	//@Query("select pm from Parameter_master pm where pm.has_details=:has_details")
 //	Page<Parameter_master> findAllWithDetails(Pageable pageable, @Param("has_details") Boolean has_details);
	
//}**/
package com.callippus.hr.Demo.web.repository;

import com.callippus.hr.Demo.domain.Parameter_master;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Parameter_master entity.
 */
public interface Parameter_masterRepository extends JpaRepository<Parameter_master,Long> {
	/*@Query("select pm from Parameter_master pm, Test_parameter tp where pm.id=tp.parameter_master.id and tp.test_batch.id=:test_batch_id and pm.has_details=:has_details")
 	Page<Parameter_master> findTestBatch(Pageable pageable, @Param("test_batch_id") Long test_batch_id, @Param("has_details") Boolean has_details);*/
 	
 	@Query("select pm from Parameter_master pm where pm.has_details=:has_details")
 	Page<Parameter_master> findAllWithDetails(Pageable pageable, @Param("has_details") Boolean has_details);

 	@Query("select pm from Parameter_master pm where pm.parameter_name=:value")
	Parameter_master findParameterName(@Param("value") String value);
	
}
