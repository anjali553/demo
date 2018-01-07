package com.callippus.hr.Demo.web.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.callippus.hr.Demo.domain.Uom;
import com.callippus.hr.Demo.web.repository.UomRepository;
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
 * REST controller for managing Uom.
 */
@RestController
@RequestMapping("/api")
public class UomResource {

    private final Logger log = LoggerFactory.getLogger(UomResource.class);

    @Inject
    private UomRepository uomRepository;

    /**
     * POST  /uoms -> Create a new uom.
     */
    @RequestMapping(value = "/uoms",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@RequestBody Uom uom) throws URISyntaxException {
        log.debug("REST request to save Uom : {}", uom);
        if (uom.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new uom cannot already have an ID").build();
        }
        uomRepository.save(uom);
        return ResponseEntity.created(new URI("/api/uoms/" + uom.getId())).build();
    }

    /**
     * PUT  /uoms -> Updates an existing uom.
     */
    @RequestMapping(value = "/uoms",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@RequestBody Uom uom) throws URISyntaxException {
        log.debug("REST request to update Uom : {}", uom);
        if (uom.getId() == null) {
            return create(uom);
        }
        uomRepository.save(uom);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /uoms -> get all the uoms.
     */
    @RequestMapping(value = "/uoms",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Uom>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Uom> page = uomRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/uoms", offset, limit);
        return new ResponseEntity<List<Uom>>(page.getContent(), headers, HttpStatus.OK);
    }
    
    
    /***
     *  GET /uoms/getUomsBasedOnRequirement.     
     */
    
    @RequestMapping(value = "/uoms/getUomsBasedOnRequirement",
    		method = RequestMethod.GET,
    	    produces = MediaType.APPLICATION_JSON_VALUE)
    
    @Timed
    public ResponseEntity<List<Uom>> getAllTheUoms(@RequestParam(value = "page" , required = false) Integer offset,
            @RequestParam(value = "per_page", required = false) Integer limit)
throws URISyntaxException {
    	
    	Page<Uom> page = uomRepository.findUomsByFilter(PaginationUtil.generatePageRequest(offset, limit));
    	 HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/uoms", offset, limit);
         return new ResponseEntity<List<Uom>>(page.getContent(), headers, HttpStatus.OK);
    }
    
    

    /**
     * GET  /uoms/:id -> get the "id" uom.
     */
    @RequestMapping(value = "/uoms/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Uom> get(@PathVariable Long id, HttpServletResponse response) {
        log.debug("REST request to get Uom : {}", id);
        Uom uom = uomRepository.findOne(id);
        if (uom == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(uom, HttpStatus.OK);
    }

    /**
     * DELETE  /uoms/:id -> delete the "id" uom.
     */
    @RequestMapping(value = "/uoms/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Uom : {}", id);
        uomRepository.delete(id);
    }
}
