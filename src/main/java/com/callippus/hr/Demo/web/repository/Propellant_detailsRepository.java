package com.callippus.hr.Demo.web.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.callippus.hr.Demo.domain.Propellant_details;

/**
 * Spring Data JPA repository for the Propellant_details entity.
 */
public interface Propellant_detailsRepository extends JpaRepository<Propellant_details,Long> {
	@Query("select tp from Propellant_details tp where tp.test_batch.id=:test_batch_id")
	Page<Propellant_details> findTestBatch(Pageable pageable, @Param("test_batch_id") Long test_batch_id);
	
	@Query("select tp from Propellant_details tp where tp.test_batch.id=:test_batch_id")
	List<Propellant_details> findTestBatch( @Param("test_batch_id") Long test_batch_id);

	@Query("select count(*) from Propellant_details pd where pd.test_batch.id =:testBatchId")
	Long propellantDetailsCount(@Param("testBatchId") Long testBatchId);
	
	@Query("select pd from Propellant_details pd where pd.test_batch.id =:testBatchId")
	Propellant_details getPreviousDetailsOfPropellantDetails(@Param("testBatchId") Long testBatchId);

	@Query("select pdr from Propellant_details pdr where pdr.test_batch.id =:testBatchId")
	List<Propellant_details> getPropellantDetailsToClone(@Param("testBatchId") Long id);
	
}