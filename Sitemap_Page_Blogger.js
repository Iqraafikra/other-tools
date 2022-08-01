//var ShowImage = false;
var labels=[];
var grotitle = document.createElement("h1");
grotitle.style.textAlign="center";
grotitle.textContent="فهرس المدونة";
document.getElementById("sitemapbyMH").appendChild(grotitle);
function GetLabels(e) {
    for (let i = 0; i < e.feed.category.length; i++) {
        labels.push(e.feed.category[i].term);
        var titlemh = document.createElement("h2");
        
            titlemh.className="h2style";
        
        titlemh.innerHTML=e.feed.category[i].term;
        var listul = document.createElement("ul");
        listul.className="MH" + i;
        document.getElementById("sitemapbyMH").appendChild(titlemh);
        document.getElementById("sitemapbyMH").appendChild(listul);
    }
    var script =document.createElement("script")
    script.src="/feeds/posts/default/?start-index=1&max-results=150&orderby=published&alt=json-in-script&callback=GetSitemap";
    document.getElementById("sitemapbyMH").appendChild(script);
}
var num=0;
var goku = true;
function GetSitemap(e) {
    for (let i = 0; i < e.feed.entry.length; i++) {
        if (e.feed.entry[i].hasOwnProperty("category")){
        for (let r = 0; r < e.feed.entry[i].category.length; r++) {
            var label = e.feed.entry[i].category[r].term;
            var labelorder = labels.indexOf(label);
            var post = document.createElement("li");
            post.className="item-MH";
            var postorder = e.feed.entry[i].link.length - 1 ;
            if (ShowImage == true){
               var a = document.createElement("a");
               a.className="ImageContainer";
               var img = document.createElement("img");
               if (e.feed.entry[i].hasOwnProperty("media$thumbnail")){
                img.src=e.feed.entry[i]["media$thumbnail"].url;
               }else{
                   img.src="https://4.bp.blogspot.com/-O3EpVMWcoKw/WxY6-6I4--I/AAAAAAAAB2s/KzC0FqUQtkMdw7VzT6oOR_8vbZO6EJc-ACK4BGAYYCw/s72-c/nth.png";
               }
               
               a.href=e.feed.entry[i].link[postorder].href;
               a.target="_blank";
               a.appendChild(img);
               post.appendChild(a);
               post.innerHTML=post.innerHTML + "<a class=\"Title_url\" href=\""+ e.feed.entry[i].link[postorder].href +"\" target=\"_blank\">"+ e.feed.entry[i].link[postorder].title; + "</a>";
            }else{
                post.style.listStyle="circle";
                post.className="nothing"
                post.innerHTML=post.innerHTML + "<a class=\"titleurlnoimg\" href=\""+ e.feed.entry[i].link[postorder].href +"\" target=\"_blank\">"+ e.feed.entry[i].link[postorder].title; + "</a>";
            }
            
            document.getElementsByClassName("MH" + labelorder)[0].appendChild(post);
        }
    }
    }
var allposts = parseInt(e.feed["openSearch$totalResults"]["$t"]);
num+=150;
    if (allposts > num){
        var script =document.createElement("script")
        script.src="/feeds/posts/default/?start-index="+num+"&max-results=150&orderby=published&alt=json-in-script&callback=GetSitemap";
        document.getElementById("sitemapbyMH").appendChild(script);
    }
}
    var scripto =document.createElement("script")
    scripto.src="/feeds/posts/default/?start-index=1&max-results=150&orderby=published&alt=json-in-script&callback=GetLabels";
    document.getElementById("sitemapbyMH").appendChild(scripto);