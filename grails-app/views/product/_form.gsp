<%@ page import="bigjrepository.Product" %>



<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'color', 'error')} required">
	<label for="color">
		<g:message code="product.color.label" default="Color" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="color" required="" value="${productInstance?.color}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'description', 'error')} required">
	<label for="description">
		<g:message code="product.description.label" default="Description" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="description" required="" value="${productInstance?.description}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'item_name', 'error')} required">
	<label for="item_name">
		<g:message code="product.item_name.label" default="Itemname" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="item_name" required="" value="${productInstance?.item_name}"/>

</div>

%{-- <div class="fieldcontain ${hasErrors(bean: productInstance, field: 'photo_file_name', 'error')} required">
	<label for="photo_file_name">
		<g:message code="product.photo_file_name.label" default="Photofilename" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="photo_file_name" required="" value="${productInstance?.photo_file_name}"/>

</div> --}%
%{-- <g:uploadForm action="upload">
	<fieldset class="form">
		Photo: --}%
        
%{-- 	</fieldset>
</g:uploadForm> --}%

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'price', 'error')} required">
	<label for="price">
		<g:message code="product.price.label" default="Price" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="price" value="${fieldValue(bean: productInstance, field: 'price')}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'quantity', 'error')} required">
	<label for="quantity">
		<g:message code="product.quantity.label" default="Quantity" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="quantity" type="number" value="${productInstance.quantity}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'size', 'error')} required">
	<label for="size">
		<g:message code="product.size.label" default="Size" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="size" required="" value="${productInstance?.size}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: productInstance, field: 'stock_number', 'error')} required">
	<label for="stock_number">
		<g:message code="product.stock_number.label" default="Stocknumber" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="stock_number" required="" value="${productInstance?.stock_number}"/>

</div>

<input type="file" name="file" />

