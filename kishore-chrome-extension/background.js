chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    // Simple summary: take first 3 sentences as a placeholder
    const text = request.text || '';
    const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [];
    const summary = sentences.slice(0, 3).join(' ').trim() || 'No summary available.';
    sendResponse({ summary });
    return true;
  }
});
