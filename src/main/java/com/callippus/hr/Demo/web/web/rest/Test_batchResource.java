package com.callippus.hr.Demo.web.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.callippus.hr.Demo.domain.Propellant_details;
import com.callippus.hr.Demo.domain.TestBatchCountDTO;
import com.callippus.hr.Demo.domain.Test_batch;
import com.callippus.hr.Demo.web.repository.Propellant_detailsRepository;
import com.callippus.hr.Demo.web.repository.Test_batchRepository;
import com.callippus.hr.Demo.web.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
/**
 * REST controller for managing Test_batch.
 */
@RestController
@RequestMapping("/api")
public class Test_batchResource {

	private final Logger log = LoggerFactory
			.getLogger(Test_batchResource.class);

	@Inject
	private Test_batchRepository test_batchRepository;
	
	@Inject
	private  Propellant_detailsRepository   propellant_detailsRepository;
	
	/**
	 * POST /test_batchs -> Create a new test_batch.
	 */
	@RequestMapping(value = "/test_batchs", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Void> create(HttpServletRequest request,
			@RequestBody Test_batch test_batch) throws URISyntaxException, Exception {
		log.debug("REST request to save Test_batch : {}", test_batch);
		if (test_batch.getId() != null) {
			return ResponseEntity
					.badRequest()
					.header("Failure",
							"A new test_batch cannot already have an ID")
					.build();
		}

		/*test_batch.setPredicted_data("");
		test_batch.setSensor_layout("");*/
		test_batchRepository.save(test_batch);
		
		/*HashMap<String,String> hm = new HashMap<String,String>();
		hm.put("sensorLayout", "setSensor_layout");
		hm.put("predicted_data", "setPredicted_data");
		UploadDownloadResource.setValues(test_batch, hm, request, test_batch.getId());
		test_batch.setStatus(0);
		test_batchRepository.save(test_batch);*/
		return ResponseEntity.created(
				new URI("/api/test_batchs/" + test_batch.getId())).build();
	}

	/**
	 * PUT /test_batchs -> Updates an existing test_batch.
	 */
	@RequestMapping(value = "/test_batchs", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Void> update(HttpServletRequest request,
			@RequestBody Test_batch test_batch) throws URISyntaxException,Exception {
		log.debug("REST request to update Test_batch : {}", test_batch);
		if (test_batch.getId() == null) {
			return create(request, test_batch);
		}

		/*HashMap<String,String> hm = new HashMap<String,String>();
		hm.put("sensorLayout", "setSensor_layout");
		hm.put("predicted_data", "setPredicted_data");	
		UploadDownloadResource.setValues(test_batch, hm, request, test_batch.getId());*/
		
		test_batchRepository.save(test_batch);
		return ResponseEntity.ok().build();
	}

	/**
	 * GET /test_batchs -> get all the test_batchs.
	 */
	@RequestMapping(value = "/test_batchs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<List<Test_batch>> getAll(
			@RequestParam(value = "page", required = false) Integer offset,
			@RequestParam(value = "per_page", required = false) Integer limit,
			//@RequestParam(value = "requisitionId", required = false) Long requisitionId,
			@RequestParam(value = "testBatchStatus", required = false) Integer testBatchStatus)
			throws URISyntaxException {

		Page<Test_batch> page= null;
		/*if (requisitionId == null) {
			page = test_batchRepository.findAll(PaginationUtil
					.generatePageRequest(offset, limit));
		} else if(testBatchStatus == null){
			Requisition requisition = requisitionRepository
					.findOne(requisitionId);
			page = test_batchRepository.findByRequisition(
					PaginationUtil.generatePageRequest(offset, limit),
					requisition);
		}else if(testBatchStatus == 0){
			page = test_batchRepository.findByStatusAndRequisition(PaginationUtil.generatePageRequest(offset, limit),testBatchStatus, requisitionRepository
					.findOne(requisitionId));
		}
		else if(testBatchStatus == 1){
			page = test_batchRepository.findByStatusAndRequisition(PaginationUtil.generatePageRequest(offset, limit),testBatchStatus, requisitionRepository
					.findOne(requisitionId));
			
		}
		else if(testBatchStatus == 2){
			page = test_batchRepository.findByStatusAndRequisition(PaginationUtil.generatePageRequest(offset, limit),testBatchStatus, requisitionRepository
					.findOne(requisitionId));			
		}*/
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(
				page, "/api/test_batchs", offset, limit);
		return new ResponseEntity<List<Test_batch>>(page.getContent(), headers,
				HttpStatus.OK);
	}
	
	

	/**
	 * GET /test_batchs/:id -> get the "id" test_batch.
	 */
	@RequestMapping(value = "/test_batchs/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Test_batch> get(@PathVariable Long id,
			HttpServletResponse response) {
		log.debug("REST request to get Test_batch : {}", id);
		Test_batch test_batch = test_batchRepository.findOne(id);
		if (test_batch == null) {
			return new ResponseEntity<Test_batch>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Test_batch>(test_batch, HttpStatus.OK);
	}

	/**
	 * DELETE /test_batchs/:id -> delete the "id" test_batch.
	 */
	@RequestMapping(value = "/test_batchs/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public void delete(@PathVariable Long id) {
		log.debug("REST request to delete Test_batch : {}", id);
		
	     List<Propellant_details>pds= propellant_detailsRepository.findTestBatch(id);
	     for(Propellant_details ptds:pds ){
	    	 propellant_detailsRepository.delete(ptds.getId());
							}
	}
	  

	     //testBatches.delete(tb.getId());
	
	     
		//test_batchRepository.delete(id);
		//test_batchRepository.delete(id);
	

	
	//count of test batches
	
	/*@RequestMapping(value = "/test_batchs/count",method =  RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Long> findCountOfTestBatches(
			@RequestParam(value = "requisitionNo", required = false) Long requisitionNo) throws URISyntaxException{			
		Long test_batches = test_batchRepository.countTestBatches(requisitionNo);		
		return new ResponseEntity<Long>(test_batches,HttpStatus.OK);
		
	}*/
	
	//get TestBatchLenght Details
	
	
	/*@RequestMapping(value = "/test_batchs/getLengthOfTestBatches",method =  RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Requisition> findLengthOfTestBatches(
			@RequestParam(value = "requisitionId", required = false) Long requisitionId) throws URISyntaxException{			
		Requisition test_batches = requisitionRepository.getTestBatchesInReq(requisitionId);
		if (test_batches == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
		return new ResponseEntity<>(test_batches,HttpStatus.OK);
		
	}*/
	
	// get Test batches result
	
	
	/*@RequestMapping(value = "/test_batchs/getDetailsOfTestBatches",method =  RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<List<Test_batch>> findTestBatchesResult(
			@RequestParam(value = "requisitionId", required = false) Long requisitionId) throws URISyntaxException{			
		List<Test_batch> test_batches = test_batchRepository.getTestBatchesDetails(requisitionId);
		
		return new ResponseEntity<List<Test_batch>>(test_batches,HttpStatus.OK);
		
	}	*/
	
	
	// Clone previous details 
	
	/*@RequestMapping(value = "/test_batchs/getPreviousDataOfTestBatch",method =  RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Test_batch> findPreviousTestBatchDetails(
			@RequestParam(value = "clonereqId", required = false) Long clonereqId,
			@RequestParam(value = "requisitionId", required = false)Long requisitionId) throws URISyntaxException{	
		
			Long testBatchMaxId = test_batchRepository.findTestBatchMaxId(clonereqId);			
			Test_batch test_batches =  test_batchRepository.findOne(testBatchMaxId);	
			return new ResponseEntity<Test_batch>(test_batches,HttpStatus.OK);
				
	}	
	*/
	
	/*public ResponseEntity<TestBatchCountDTO> getTestBatchCount(@Param("requisitionId")  Long requisitionId, @Param("testBatchId") Long testBatchId)
	throws Exception {
		log.debug("REST request to get getTestBatchCount : {}");
		Long count = 0l;
		//Requisition requisition = requisitionRepository.findOne(requisitionId);
		//List<TestBatchCountDTO> testBatchCountDTOs = new ArrayList<TestBatchCountDTO>();
		List<Test_batch> testBatches = test_batchRepository.findByRequisition(requisitionRepository.findOne(requisitionId));
		TestBatchCountDTO testBatchCountDTO = new TestBatchCountDTO();
		for(Test_batch tb : testBatches){
			count=count+1l;
			if(tb.getId().equals(testBatchId)){
				testBatchCountDTO.setTestBatchCount(count);
				testBatchCountDTO.setTestBatchId(tb.getId());
			}
			
		}
		return new ResponseEntity<TestBatchCountDTO>(testBatchCountDTO, HttpStatus.OK);*/
		/*return Optional.ofNullable(requisitionRequestsDTOs)
				.map(result -> new ResponseEntity<>(requisitionRequestsDTOs, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.OK));*/
/*}*/
}

