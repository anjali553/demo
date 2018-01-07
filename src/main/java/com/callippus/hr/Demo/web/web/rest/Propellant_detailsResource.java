package com.callippus.hr.Demo.web.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
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
import com.callippus.hr.Demo.web.repository.Propellant_detailsRepository;
import com.callippus.hr.Demo.web.repository.Test_batchRepository;
import com.callippus.hr.Demo.web.web.rest.Propellant_detailsResource;
import com.callippus.hr.Demo.web.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;

@RestController
@RequestMapping("/api")
public class Propellant_detailsResource{
	
	private final Logger log = LoggerFactory.getLogger(Propellant_detailsResource.class);
	
	@Inject
	private Propellant_detailsRepository propellant_detailsRepository;
	
	@Inject
	private Test_batchRepository test_batchRepository;
	
	//propellant_detailss -> Create a new propellant_details.
   
   @RequestMapping(value = "/propellant_detailss",
           method = RequestMethod.POST,
           produces = MediaType.APPLICATION_JSON_VALUE)
   @Timed
   public ResponseEntity<Void> create(@Valid @RequestBody Propellant_details propellant_details) throws URISyntaxException{
	   log.debug("REST request to save Propellant_details : {}", propellant_details);
       if (propellant_details.getId() != null) {
           return ResponseEntity.badRequest().header("Failure", "A new propellant_details cannot already have an ID").build();
       }
       propellant_detailsRepository.save(propellant_details);
       return ResponseEntity.created(new URI("/api/propellant_detailss/" + propellant_details.getId())).build();
   }
   
   //propellant_detailss -> Update propellant_details.
   
   @RequestMapping(value = "/propellant_detailss",
	        method = RequestMethod.PUT,
	        produces = MediaType.APPLICATION_JSON_VALUE)
   @Timed
   public ResponseEntity<Void> update(@Valid @RequestBody Propellant_details propellant_details) throws URISyntaxException{
	   log.debug("REST request to update Propellant_details : {}", propellant_details);
	   if (propellant_details.getId() == null){
		   return create(propellant_details);
	   }
	   propellant_detailsRepository.save(propellant_details);
	   return ResponseEntity.ok().build();
   }
	 
   /**
    * GET  /propellant_detailss -> get all the propellant_detailss.
    */
   @RequestMapping(value = "/propellant_detailss",
           method = RequestMethod.GET,
           produces = MediaType.APPLICATION_JSON_VALUE)
   @Timed
   public ResponseEntity<List<Propellant_details>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
           @RequestParam(value = "per_page", required = false) Integer limit,
 			@RequestParam(value = "testBatchId", required = false) Long testBatchId) throws URISyntaxException{
	   
	   Page<Propellant_details> page;
		if (testBatchId == null) {
			page = propellant_detailsRepository.findAll(
					PaginationUtil.generatePageRequest(offset, limit));
		} else {
			page = propellant_detailsRepository.findTestBatch(
					PaginationUtil.generatePageRequest(offset, limit),
					testBatchId);
		}

       HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/propellant_detailss", offset, limit);
       return new ResponseEntity<List<Propellant_details>>(page.getContent(), headers, HttpStatus.OK);
   }
   
   /**
    * GET  /propellant_detailss/:id -> get the "id" propellant_details.
    */
   @RequestMapping(value = "/propellant_detailss/{id}",
           method = RequestMethod.GET,
           produces = MediaType.APPLICATION_JSON_VALUE)
   @Timed
   public ResponseEntity<Propellant_details> get(@PathVariable Long id, HttpServletResponse response) {
       log.debug("REST request to get Propellant_details : {}", id);
       Propellant_details propellant_details = propellant_detailsRepository.findOne(id);
       if (propellant_details == null) {
           return new ResponseEntity<Propellant_details>(HttpStatus.NOT_FOUND);
       }
       return new ResponseEntity<Propellant_details>(propellant_details, HttpStatus.OK);
   }

   /**
    * DELETE  /propellant_detailss/:id -> delete the "id" propellant_details.
    */
   @RequestMapping(value = "/propellant_detailss/{id}",
           method = RequestMethod.DELETE,
           produces = MediaType.APPLICATION_JSON_VALUE)
   @Timed
   public void delete(@PathVariable Long id) {
       log.debug("REST request to delete Propellant_details : {}", id);
       propellant_detailsRepository.delete(id);
   }
}
	