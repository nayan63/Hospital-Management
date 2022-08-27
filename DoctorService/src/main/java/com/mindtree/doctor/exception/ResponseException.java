package com.mindtree.doctor.exception;

import java.util.Date;

public class ResponseException {

	private Date date;
	private String message;
	private String desc;
	public ResponseException() {
		super();
	}
	public ResponseException(Date date, String message, String desc) {
		super();
		this.date = date;
		this.message = message;
		this.desc = desc;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
