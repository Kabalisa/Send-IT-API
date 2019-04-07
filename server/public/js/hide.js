function ondis() {
  const x = document.getElementsByTagName("input");
  for (i = 0; i < 7; i++) {
    if (i === 5 || i === 6) {
      continue;
    }
    x[i].disabled = false;
  }
}
