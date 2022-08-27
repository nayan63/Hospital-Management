package com.mindtree.doctor.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<Object> detailsNotFoundException(Exception e,WebRequest wr)
	{
		ResponseException re = new ResponseException(new Date(),e.getMessage(),wr.getDescription(false));
		return new ResponseEntity<Object>(re,HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
