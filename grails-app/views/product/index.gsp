
<%@ page import="bigjrepository.Product" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'product.label', default: 'Product')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-product" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-product" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<fieldset class="form">
			    <g:form action="index" method="GET">
			        <div class="fieldcontain">
			            <label for="query">Search for products:</label>

			            <g:select name="characteristic" value="${params.characteristic}" from="${attributes}" optionKey="value" optionValue="key">
						</g:select>
						%{--<g:textField name="foo" value="${params.foo}"/>--}%
			            <g:textField name="query" value="${params.query}"/>

			        </div>
			    </g:form>
			</fieldset>
			<table>
			<thead>
					<tr>
						<td>Picture</td>
						<g:sortableColumn property="color" title="${message(code: 'product.color.label', default: 'Color')}" />
					
						<g:sortableColumn property="description" title="${message(code: 'product.description.label', default: 'Description')}" />
					
						<g:sortableColumn property="item_name" title="${message(code: 'product.item_name.label', default: 'Itemname')}" />
					
						<g:sortableColumn property="photo_file_name" title="${message(code: 'product.photo_file_name.label', default: 'Photofilename')}" />
					
						<g:sortableColumn property="price" title="${message(code: 'product.price.label', default: 'Price')}" />
					
						<g:sortableColumn property="quantity" title="${message(code: 'product.quantity.label', default: 'Quantity')}" />

						<g:sortableColumn property="size" title="${message(code: 'product.size.label', default: 'Size')}" />

						<g:sortableColumn property="stock_number" title="${message(code: 'product.stock_number.label', default: 'Stock Number')}" />

					
					</tr>
				</thead>
				<tbody>
				<g:each in="${productInstanceList}" status="i" var="productInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
						<td>
							<g:if test="${productInstance?.photo_file_name}">
								<img src="/BigJRepository/images/${productInstance.id}.${productInstance.photo_file_name}" width="100">
							</g:if>
							<g:else>
							    <img src="/BigJRepository/images/default.jpg" width="200">
							</g:else>
						</td>
						<td><g:link action="show" id="${productInstance.id}">${fieldValue(bean: productInstance, field: "color")}</g:link></td>
					
						<td>${fieldValue(bean: productInstance, field: "description")}</td>
					
						<td>${fieldValue(bean: productInstance, field: "item_name")}</td>
					
						<td>${fieldValue(bean: productInstance, field: "photo_file_name")}</td>
					
						<td>${fieldValue(bean: productInstance, field: "price")}</td>
					
						<td>${fieldValue(bean: productInstance, field: "quantity")}</td>

						<td>${fieldValue(bean: productInstance, field: "size")}</td>

						<td>${fieldValue(bean: productInstance, field: "stock_number")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${productInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
