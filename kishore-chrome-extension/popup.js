document.getElementById('play-music').addEventListener('click', function() {
  // Open a random Kishore Kumar song or playlist in a new tab
  const kishoreSongs = [
    'https://www.youtube.com/watch?v=c_my5B15ENU&list=RDc_my5B15ENU&start_radio=1',
    'https://www.youtube.com/watch?v=rBqmGVp_XKw&list=RDrBqmGVp_XKw&start_radio=1',
    'https://www.youtube.com/watch?v=j7TM2ccOGbU&list=PLUOEf-vLOCSkxWY5z9cjS4OT3oZ9D8suk',
    'https://www.youtube.com/watch?v=x50-kXC54yU&list=RDx50-kXC54yU&start_radio=1',
    'https://www.youtube.com/watch?v=5VexNID24A4&list=RD5VexNID24A4&start_radio=1',
    'https://www.youtube.com/watch?v=kJIidWqWjUs&list=RDkJIidWqWjUs&start_radio=1' // Example playlist
  ];
  const url = kishoreSongs[Math.floor(Math.random() * kishoreSongs.length)];
  url='https://www.youtube.com/watch?v=c_my5B15ENU&list=RDc_my5B15ENU&start_radio=1';
  chrome.tabs.create({ url });
});
