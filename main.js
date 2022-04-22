var siteName = document.getElementById("siteName");
var url = document.getElementById("url");
var sites = [];
if (localStorage.getItem('ourSites') != null) {
  sites = JSON.parse(localStorage.getItem('ourSites'));
  displaySites();
}
function addSite() {
  if (siteName.value == "" && url.value != "") {
    document.getElementById("one").innerHTML = "Name is required";
    document.getElementById("one").style.display = "block";
    document.getElementById("two").style.display = "none";
  } else if (siteName.value != "" && url.value == "") {
    document.getElementById("two").style.display = "block";
    document.getElementById("one").style.display = "none";
  }
  else if (siteName.value == "" || url.value == "") {
    if (siteName.value == "") {
      document.getElementById("one").innerHTML = "Name is required";
      document.getElementById("one").style.display = "block";
    }
    if (url.value == "") {
      document.getElementById("two").style.display = "block";
    }
  } else if (!search()) {
    document.getElementById("one").innerHTML = "this url already exist";
    document.getElementById("one").style.display = "block";
    document.getElementById("two").style.display = "block";
  } else {
    var add = {
      name: siteName.value,
      URL: url.value,
    }
    sites.push(add);
    localStorage.setItem('ourSites', JSON.stringify(sites));
    displaySites();
    document.getElementById("one").style.display = "none";
    document.getElementById("two").style.display = "none";
    clear();
  }
}
function displaySites() {
  var cartoon = "";
  for (var i = 0; i < sites.length; i++) {
    cartoon += `
    <tr class="py-3">
    <td>
    <h3>${sites[i].name}</h3>
    </td>
    <td>
    <button onclick="visit(${i})" type="submit" class="btn btn-primary">visit</button>
    <button onclick="Delete(${i})" type="submit" class="btn btn-Danger">Delete</button>
    </td>
    </tr>
    <tr style="border-bottom: 10px solid white;"></tr>
    `
  }
  document.getElementById("Table").innerHTML = cartoon;
}
function visit(pos) {
  window.location.href = sites[pos].URL;
}
function Delete(pos) {
  sites.splice(pos, 1);
  localStorage.setItem('ourSites', JSON.stringify(sites));
  displaySites();
}
function clear() {
  siteName.value = "";
  url.value = "";
}
function search() {
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name == siteName.value) {
      return false;
    }
  }
  return true;
}