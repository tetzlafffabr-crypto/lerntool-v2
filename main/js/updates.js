let version = localStorage.getItem("currentVersion");

document.getElementById("versionOutput").innerText = version;

console.log(`root> Version: ${version} loaded`);