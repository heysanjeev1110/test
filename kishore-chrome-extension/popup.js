document.getElementById('play-music').addEventListener('click', function() {
  // Open a random Kishore Kumar song or playlist in a new tab
  const kishoreSongs = [
    'https://www.youtube.com/watch?v=Zkq0gVjv6kY',
    'https://www.youtube.com/watch?v=QhF3hZp1V4w',
    'https://www.youtube.com/watch?v=6pQltK2Q2c4',
    'https://www.youtube.com/watch?v=6QvYJr2Q2nA',
    'https://www.youtube.com/watch?v=6QvYJr2Q2nA',
    'https://www.youtube.com/playlist?list=PLrDg7LoYgk9xwQ1QwQ1QwQ1QwQ1QwQ1Qw' // Example playlist
  ];
  const url = kishoreSongs[Math.floor(Math.random() * kishoreSongs.length)];
  chrome.tabs.create({ url });
});

document.getElementById('summarize').addEventListener('click', function() {
  document.getElementById('summary').innerText = 'Summarizing...';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => document.body.innerText
    }, (results) => {
      const pageText = results[0].result;
      // Call background to summarize
      chrome.runtime.sendMessage({action: 'summarize', text: pageText}, function(response) {
        document.getElementById('summary').innerText = response.summary || 'Failed to summarize.';
      });
    });
  });
});
