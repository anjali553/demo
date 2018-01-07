package com.callippus.hr.Demo.web.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.callippus.hr.Demo.domain.Parameter_master;
import com.callippus.hr.Demo.web.repository.Parameter_masterRepository;
import com.callippus.hr.Demo.web.web.rest.util.PaginationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletResponse;

import java.util.List;

/**
 * REST controller for managing Parameter_master.
 */
@RestController
@RequestMapping("/api")
public class Parameter_masterResource {

	private final Logger log = LoggerFactory
			.getLogger(Parameter_masterResource.class);

	@Inject
	private Parameter_masterRepository parameter_masterRepository;

	/**
	 * POST /parameter_masters -> Create a new parameter_master.
	 */
	@RequestMapping(value = "/parameter_masters", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Void> create(
			@RequestBody Parameter_master parameter_master)
			throws URISyntaxException {
		log.debug("REST request to save Parameter_master : {}",
				parameter_master);
		if (parameter_master.getId() != null) {
			return ResponseEntity
					.badRequest()
					.header("Failure",
							"A new parameter_master cannot already have an ID")
					.body(null);
		}
		Parameter_master result = parameter_masterRepository
				.save(parameter_master);
		return ResponseEntity.created(
				new URI("/api/parameter_masters/" + parameter_master.getId()))
				.build();
	}

	/**
	 * PUT /parameter_masters -> Updates an existing parameter_master.
	 */
	@RequestMapping(value = "/parameter_masters", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Void> update(
			@RequestBody Parameter_master parameter_master)
			throws URISyntaxException {
		log.debug("REST request to update Parameter_master : {}",
				parameter_master);
		if (parameter_master.getId() == null) {
			return create(parameter_master);
		}
		Parameter_master result = parameter_masterRepository
				.save(parameter_master);
		return ResponseEntity.created(
				new URI("/api/parameter_masters/" + parameter_master.getId()))
				.build();
	}

	/**
	 * GET /parameter_masters -> get all the parameter_masters.
	 */
	@RequestMapping(value = "/parameter_masters", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<List<Parameter_master>> getAll(
			@RequestParam(value = "page", required = false) Integer offset,
			@RequestParam(value = "per_page", required = false) Integer limit,
			/*@RequestParam(value = "testBatchId", required = false) Long testBatchId,*/
			@RequestParam(value = "has_details", required = false) Boolean has_details)
			throws URISyntaxException {

		/*Page<Parameter_master> page;
			if (testBatchId == null) {
				page = parameter_masterRepository.findAll(PaginationUtil
						.generatePageRequest(offset, limit));
			} else {
				page = parameter_masterRepository.findTestBatch(
						PaginationUtil.generatePageRequest(offset, limit),
						testBatchId, has_details);
			}*/
		Page<Parameter_master> page;
		if (has_details == null) {
			page = parameter_masterRepository.findAll(PaginationUtil
					.generatePageRequest(offset, limit));
		} else {
			page = parameter_masterRepository.findAllWithDetails(
					PaginationUtil.generatePageRequest(offset, limit),
					has_details);
		}
		//Page<Parameter_master> page = parameter_masterRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
		
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(
				page, "/api/parameter_masters", offset, limit);
		return new ResponseEntity<List<Parameter_master>>(page.getContent(),
				headers, HttpStatus.OK);
	}

	/**
	 * GET /parameter_masters/:id -> get the "id" parameter_master.
	 */
	@RequestMapping(value = "/parameter_masters/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public ResponseEntity<Parameter_master> get(@PathVariable Long id,
			HttpServletResponse response) {
		log.debug("REST request to get Parameter_master : {}", id);
		Parameter_master parameter_master = parameter_masterRepository
				.findOne(id);
		if (parameter_master == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(parameter_master, HttpStatus.OK);
	}

	/**
	 * DELETE /parameter_masters/:id -> delete the "id" parameter_master.
	 */
	@RequestMapping(value = "/parameter_masters/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public void delete(@PathVariable Long id) {
		log.debug("REST request to delete Parameter_master : {}", id);
		parameter_masterRepository.delete(id);
	}
}
