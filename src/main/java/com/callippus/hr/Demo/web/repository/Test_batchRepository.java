package com.callippus.hr.Demo.web.repository;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.callippus.hr.Demo.domain.Test_batch;

/**
 * Spring Data JPA repository for the Test_batch entity.
 */
public interface Test_batchRepository extends JpaRepository<Test_batch,Long> {
	
	@Query("select count(*) from Test_batch tb where tb.id =:id")
	 Long countTestBatches(@Param("id") Long id);
	
	/*Page<Test_batch> findByRequisition(Pageable pageable, Requisition requisition);
	
	Page<Test_batch> findByStatusAndRequisition(Pageable pageable, Integer status, Requisition requisition);

	@Query("select count(*) from Test_batch tb where tb.requisition.id =:id")
	 Long countTestBatches(@Param("id") Long id);

	@Query("from Test_batch t where t.requisition.id =:requisitionId")
	List<Test_batch> getTestBatchesDetails(@Param("requisitionId") Long requisitionId);

	@Query("select count(*) from Test_batch tbh where tbh.requisition.id =:id")
	Integer testBatchCount(@Param("id") Long id);

	@Query("from Test_batch tbc where tbc.requisition.id =:maxCount")
	Test_batch getTestBatchData(@Param("maxCount") Long maxCount);

	@Query("select count(*) from Test_batch tb where tb.requisition.id =:requisitionId")
	Integer findCountOfTestBatches(@Param("requisitionId") Long id);

	@Query("select max(id) from Test_batch tb where tb.requisition.id=:clonereqId")
	Long findTestBatchMaxId(@Param("clonereqId") Long clonereqId);

	@Query("select tb from Test_batch tb where tb.requisition.id =:reqId")
	List<Test_batch> getTestBatchDetailsToClone(@Param("reqId") Long reqId);
	
	//@Query("select tb.test_objective,tb.test_nomenclature,tb.no_of_tests_in_batch,tb.proposed_date_time,tb.is_ambient,tb.non_ambient_temperature from Test_batch tb where tb.requisition.id =:reqId")

	List<Test_batch> findByRequisition(Requisition requisition);*/

}
