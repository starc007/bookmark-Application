//Listen For form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e) {
   //get form values
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
    	return false;
    }

   var bookmark = {
   	name: siteName,
   	url: siteUrl
   }

   //local storage test
   // localStorage.setItem('test' ,'HEllo');
   
   if(localStorage.getItem('bookmarks') === null){
   	var bookmarks = [];
   	//add to array
    bookmarks.push(bookmark);
    //set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }else{
   	//get bookmarks from local storage
   	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   	bookmarks.push(bookmark);
   	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }

    //clear form
    document.getElementById('myForm').reset();

    fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}
//delete bookmark
function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0 ;i<bookmarks.length;i++){
		if (bookmarks[i].url == url) 
		{
			bookmarks.splice(i ,1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}
//fetch bookmark
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResults = document.getElementById('bookmarksResults');
	bookmarksResults.innerHTML = "";
	for(var i = 0; i<bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

	    bookmarksResults.innerHTML += '<div class="well">'+
		                              '<h3>'+name+
		                              ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> '+
		                              ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
		                              '</h3>'+
		                              '<div>';
	}
}

function validateForm(siteName, siteUrl) {
	   if (!siteName || !siteUrl) {
	   	alert("Please fill out the form");
	   	return false;
	   }

	   var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	   var regex = new RegExp(expression);

	   if (!siteUrl.match(regex)) {
	   	alert("Please use a valid url");s
	   }
	   return true;
}