/**
 * This tab widget creates tabs for "anchor tags", specified within the 
 * "li" elements of "ul" element which u want to tabify, 
 * with "href" attribute as
 * "#your_div_id" containing content of tab 
 *
 * Construct tabify object as specified in demo() function at the end 
 * with 'id = your "ul" element "id"' as used in the demo
 *
 */

function tabify(arg)
{
    this.id = arg;
    this.tabLinks = new Array();
    this.contentDivs = new Array();
    init(this);
}

function init(a) {
    
    var tabListItems = document.getElementById(a.id).childNodes;
    for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
	    var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
	    var id = getHash( tabLink.getAttribute('href') );
	    a.tabLinks[id] = tabLink;
	    a.contentDivs[id] = document.getElementById( id );
        }
    }
    
    var i = 0;
    
    for ( var id in a.tabLinks ) {
	a.tabLinks[id].onclick = showTab;
	a.tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) a.tabLinks[id].className = 'selected';
        i++;
    }
        
    var i = 0;
    
    for ( var id in a.contentDivs ) {
        if ( i != 0 ) a.contentDivs[id].className = 'tabContent hide';
        i++;
    }
    
    
    function showTab() {

	var selectedId = getHash( this.getAttribute('href') );

	for ( var id in a.contentDivs ) {
	    if ( id == selectedId ) {
		a.tabLinks[id].className = 'selected';
		a.contentDivs[id].className = 'tabContent';
	    } else {
		a.tabLinks[id].className = '';
		a.contentDivs[id].className = 'tabContent hide';
	    }
	}

	return false;
    }
}

function getFirstChildWithTagName( element, tagName ) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
}

function getHash( url ) {
    var hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
}

function demo(){
    new tabify('tabs');
    new tabify('tabs2');
}
