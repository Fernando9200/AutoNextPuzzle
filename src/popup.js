// Chess.com Auto-Next Popup Script
document.addEventListener('DOMContentLoaded', () => {
  const delayInput = document.getElementById('delayInput');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // Load current settings and default to 5ms delay
  chrome.storage.sync.get(['delay'], (result) => {
    // Always default to 5ms if not set or if it's the old default (800)
    let delay = result.delay;
    if (delay === undefined || delay === 800) {
      delay = 5;
      // Save the new default
      chrome.storage.sync.set({ delay: 5 }, () => {
        console.log('Default delay set to 5ms');
      });
    }
    
    delayInput.value = delay;
  });

  // Save settings
  saveBtn.addEventListener('click', () => {
    const delay = parseInt(delayInput.value, 10);

    // Validate delay
    if (isNaN(delay) || delay < 0) {
      showStatus('⚠️ Please enter a valid delay value', false);
      return;
    }

    // Save to storage
    chrome.storage.sync.set({ delay }, () => {
      showStatus('✅ Settings saved successfully!', true);
      console.log('Settings saved:', { delay });
    });
  });

  // Show status message
  function showStatus(message, isSuccess) {
    status.textContent = message;
    status.className = 'status show' + (isSuccess ? ' success' : '');
    
    setTimeout(() => {
      status.classList.remove('show');
    }, 2500);
  }

  // Allow Enter key to save
  delayInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });
});
