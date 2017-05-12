
<%@ page import="bigjrepository.Product" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'product.label', default: 'Product')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-product" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-product" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list product">
				<g:if test="${productInstance?.photo_file_name}">
					<img src="/BigJRepository/images/${productInstance.id}.${productInstance.photo_file_name}" width="200">
				</g:if>
				<g:else>
				    <img src="/BigJRepository/images/default.jpg" width="200">
				</g:else>

				<g:if test="${productInstance?.color}">
				<li class="fieldcontain">
					<span id="color-label" class="property-label"><g:message code="product.color.label" default="Color" /></span>
					
						<span class="property-value" aria-labelledby="color-label"><g:fieldValue bean="${productInstance}" field="color"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.description}">
				<li class="fieldcontain">
					<span id="description-label" class="property-label"><g:message code="product.description.label" default="Description" /></span>
					
						<span class="property-value" aria-labelledby="description-label"><g:fieldValue bean="${productInstance}" field="description"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.item_name}">
				<li class="fieldcontain">
					<span id="item_name-label" class="property-label"><g:message code="product.item_name.label" default="Itemname" /></span>
					
						<span class="property-value" aria-labelledby="item_name-label"><g:fieldValue bean="${productInstance}" field="item_name"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.photo_file_name}">
				<li class="fieldcontain">
					<span id="photo_file_name-label" class="property-label"><g:message code="product.photo_file_name.label" default="Photofilename" /></span>
					
						<span class="property-value" aria-labelledby="photo_file_name-label"><g:fieldValue bean="${productInstance}" field="photo_file_name"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.price}">
				<li class="fieldcontain">
					<span id="price-label" class="property-label"><g:message code="product.price.label" default="Price" /></span>
					
						<span class="property-value" aria-labelledby="price-label"><g:fieldValue bean="${productInstance}" field="price"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.quantity}">
				<li class="fieldcontain">
					<span id="quantity-label" class="property-label"><g:message code="product.quantity.label" default="Quantity" /></span>
					
						<span class="property-value" aria-labelledby="quantity-label"><g:fieldValue bean="${productInstance}" field="quantity"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.size}">
				<li class="fieldcontain">
					<span id="size-label" class="property-label"><g:message code="product.size.label" default="Size" /></span>
					
						<span class="property-value" aria-labelledby="size-label"><g:fieldValue bean="${productInstance}" field="size"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${productInstance?.stock_number}">
				<li class="fieldcontain">
					<span id="stock_number-label" class="property-label"><g:message code="product.stock_number.label" default="Stocknumber" /></span>
					
						<span class="property-value" aria-labelledby="stock_number-label"><g:fieldValue bean="${productInstance}" field="stock_number"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:productInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${productInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
