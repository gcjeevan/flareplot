

function downloadSVG(flareplotSVG) {
  // Serialize svg
  const svgAsXML = (new XMLSerializer).serializeToString(flareplotSVG);
  const dataURL = "data:image/svg+xml," + encodeURIComponent(svgAsXML);

  // Create hidden button
  var dl = document.createElement("a");
  document.body.appendChild(dl); // This line makes it work in Firefox.
  dl.setAttribute("href", dataURL);
  const fname = "flareplot_" + (new Date().toString().split(" ").slice(0,5)).join("_") + ".svg";
  dl.setAttribute("download", fname);

  // Click it and remove it
  dl.click();
  document.body.removeChild(dl);
}

function downloadPNG(flareplotSVG) {
  const can = document.createElement('canvas');
  const ctx = can.getContext('2d');
  const img = new Image;

  // Draw the SVG image to a canvas
  can.width = flareplotSVG.getAttribute("width") * 2;
  can.height = flareplotSVG.getAttribute("height") * 2;
  img.onload = function(){
    ctx.scale(2.0, 2.0);
    ctx.drawImage(img, 0, 0);
    const pngDataURL = can.toDataURL("image/png");

    // Create hidden button
    var dl = document.createElement("a");
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute("href", pngDataURL);
    const fname = "flareplot_" + (new Date().toString().split(" ").slice(0,5)).join("_") + ".png";
    dl.setAttribute("download", fname);

    // Click it and remove it
    dl.click();
    document.body.removeChild(dl);
  };

  var svgAsXML = (new XMLSerializer).serializeToString(flareplotSVG);
  const svgDataURL = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
  img.src = svgDataURL;

}