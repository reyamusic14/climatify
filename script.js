// Placeholder data for climate change facts
const climateFacts = {
    flooding: [
        "Coastal flooding has doubled in the past 30 years.",
        "Sea levels are rising at 3.6mm per year globally.",
        "By 2050, coastal flooding will affect 300 million people worldwide."
    ],
    drought: [
        "Severe droughts are 20% more likely due to climate change.",
        "Global warming increases water evaporation, intensifying droughts.",
        "Drought-affected areas have increased by 50% since 1970."
    ],
    wildfires: [
        "Wildfire seasons are 78 days longer than in the 1970s.",
        "Climate change has doubled the area affected by forest fires.",
        "Wildfires release 290 million tons of CO2 annually."
    ],
    pollution: [
        "Air pollution causes 7 million premature deaths annually.",
        "90% of the world's population breathes polluted air.",
        "Urban air pollution levels have increased by 8% since 2011."
    ],
    deforestation: [
        "We lose 137 species of plants and animals daily due to deforestation.",
        "15 billion trees are cut down each year.",
        "Deforestation contributes to 15% of global greenhouse gas emissions."
    ]
};

// Add this near the top of your file
const API_KEYS = {
    unsplash: process.env.UNSPLASH_API_KEY,
    openai: process.env.OPENAI_API_KEY
};

// Placeholder function for image generation
async function generateImages() {
    const city = document.getElementById('city').value;
    const damageType = document.getElementById('damageType').value;

    if (!city || !damageType) {
        alert('Please fill in both fields');
        return;
    }

    // Show loading section
    document.querySelector('.loading-section').classList.remove('hidden');
    document.querySelector('.gallery-section').classList.add('hidden');

    try {
        // Example of using the Unsplash API with your key
        const response = await fetch(`/api/images?city=${city}&damageType=${damageType}`);
        
        const data = await response.json();
        
        // Update images with actual API response
        const images = document.querySelectorAll('.image-card img');
        images.forEach((img, index) => {
            if (data[index]) {
                img.src = data[index].urls.regular;
            }
        });

    } catch (error) {
        console.error('Error fetching images:', error);
        alert('Error generating images. Please try again.');
    } finally {
        // Hide loading and show gallery
        document.querySelector('.loading-section').classList.add('hidden');
        document.querySelector('.gallery-section').classList.remove('hidden');
    }

    // Add click handlers to select buttons
    const selectButtons = document.querySelectorAll('.select-btn');
    selectButtons.forEach(btn => {
        btn.onclick = function() {
            selectImage(this.parentElement);
        };
    });
}

function selectImage(card) {
    const selectedImage = card.querySelector('img').src;
    const aiSource = card.querySelector('.ai-source').textContent;

    // Show selected image section
    document.querySelector('.selected-image-section').classList.remove('hidden');
    document.getElementById('selectedImage').src = selectedImage;

    // Show facts section
    showFacts(document.getElementById('damageType').value);

    // Scroll to selected image
    document.querySelector('.selected-image-section').scrollIntoView({ behavior: 'smooth' });
}

function showFacts(damageType) {
    const factsSection = document.querySelector('.facts-section');
    const factsContainer = document.querySelector('.facts-container');
    
    // Clear previous facts
    factsContainer.innerHTML = '';

    // Add new facts
    climateFacts[damageType].forEach(fact => {
        const factElement = document.createElement('div');
        factElement.className = 'fact';
        factElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>${fact}</p>
        `;
        factsContainer.appendChild(factElement);
    });

    factsSection.classList.remove('hidden');
}

function saveImage() {
    const image = document.getElementById('selectedImage').src;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'climate-change-awareness.jpg';
    link.click();
}

function shareImage() {
    document.querySelector('.share-modal').classList.remove('hidden');
}

// Close modal when clicking outside
document.querySelector('.share-modal').onclick = function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
};

document.querySelector('.close-modal').onclick = function() {
    document.querySelector('.share-modal').classList.add('hidden');
};

function shareOnPlatform(platform) {
    const image = document.getElementById('selectedImage').src;
    const city = document.getElementById('city').value;
    const damageType = document.getElementById('damageType').value;
    const facts = climateFacts[damageType].join(' ');
    
    const text = `Climate change impact in ${city}: ${facts}`;
    let url;

    switch(platform) {
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            break;
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            break;
        case 'linkedin':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
            break;
    }

    window.open(url, '_blank');
    document.querySelector('.share-modal').classList.add('hidden');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
});
