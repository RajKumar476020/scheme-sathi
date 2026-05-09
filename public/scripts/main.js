document.addEventListener('DOMContentLoaded', () => {

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars-staggered');
    } else {
      icon.classList.remove('fa-bars-staggered');
      icon.classList.add('fa-xmark');
    }
  });

  // Set Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-glass');
    } else {
      navbar.classList.remove('shadow-glass');
    }
  });

  // Toast Notification
  const showToast = (message, type = 'info') => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    const iconWrapper = document.getElementById('toast-icon-wrapper');
    
    toastMessage.textContent = message;
    
    iconWrapper.className = 'w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0';
    
    if (type === 'error') {
      iconWrapper.classList.add('bg-red-500');
      toastIcon.className = 'fa-solid fa-circle-exclamation text-xl';
    } else if (type === 'success') {
      iconWrapper.classList.add('bg-brand-green');
      toastIcon.className = 'fa-solid fa-check text-xl';
    } else {
      iconWrapper.classList.add('bg-brand-navy');
      toastIcon.className = 'fa-solid fa-info text-xl';
    }
    
    toast.classList.replace('bg-gray-900', 'bg-white');
    toast.classList.add('dark:bg-dark-card', 'border', 'border-slate-200', 'dark:border-dark-border');
    
    toast.classList.remove('translate-y-[150%]', 'opacity-0');
    
    setTimeout(() => {
      toast.classList.add('translate-y-[150%]', 'opacity-0');
    }, 4000);
  };

  // Form Fields Definition grouped
  const formGroups = {
    personal: [
      { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
      { id: 'age', label: 'Age', type: 'number', placeholder: 'e.g. 25', required: true, min: 1, max: 120 },
      { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Transgender', 'Other'], required: true },
    ],
    location: [
      { id: 'state', label: 'State / Union Territory', type: 'select', options: ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'], required: true },
      { id: 'regionType', label: 'Region Type', type: 'select', options: ['Urban', 'Rural'], required: true },
    ],
    professional: [
      { id: 'annualIncome', label: 'Annual Income (₹)', type: 'number', placeholder: 'e.g. 250000', required: true, min: 0 },
      { id: 'occupation', label: 'Occupation', type: 'text', placeholder: 'e.g. Self-employed, Farmer', required: true },
      { id: 'educationLevel', label: 'Education Level', type: 'select', options: ['Illiterate', 'Below 10th', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate'], required: true },
      { id: 'employmentStatus', label: 'Employment Status', type: 'select', options: ['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'], required: true },
      { id: 'isFarmer', label: 'Are you a farmer?', type: 'select', options: ['No', 'Yes'], required: true },
      { id: 'isBusinessOwner', label: 'Own a business?', type: 'select', options: ['No', 'Yes'], required: true },
    ],
    special: [
      { id: 'category', label: 'Category', type: 'select', options: ['General', 'OBC', 'SC', 'ST'], required: true },
      { id: 'isBPL', label: 'Have a BPL Card?', type: 'select', options: ['No', 'Yes'], required: true },
      { id: 'hasAadhaar', label: 'Have Aadhaar Card?', type: 'select', options: ['Yes', 'No'], required: true },
      { id: 'hasDisability', label: 'Have any disability?', type: 'select', options: ['No', 'Yes'], required: true },
      { id: 'isMinority', label: 'Minority community?', type: 'select', options: ['No', 'Yes'], required: true },
      { id: 'isWidow', label: 'Are you a widow?', type: 'select', options: ['No', 'Yes'], required: true },
    ]
  };

  // Render Form Fields
  for (const [groupName, fields] of Object.entries(formGroups)) {
    const container = document.getElementById(`form-group-${groupName}`);
    if (!container) continue;

    fields.forEach(field => {
      const wrapper = document.createElement('div');
      wrapper.className = "relative group";
      
      const label = document.createElement('label');
      label.className = 'label-text';
      label.setAttribute('for', field.id);
      label.textContent = field.label;
      wrapper.appendChild(label);

      if (field.type === 'select') {
        const select = document.createElement('select');
        select.id = field.id;
        select.name = field.id;
        select.className = 'input-field cursor-pointer';
        if (field.required) select.required = true;
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select option';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        field.options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });
        
        wrapper.appendChild(select);
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.className = 'input-field';
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.required) input.required = true;
        if (field.min !== undefined) input.min = field.min;
        if (field.max !== undefined) input.max = field.max;
        wrapper.appendChild(input);
      }

      container.appendChild(wrapper);
    });
  }

  // Load Saved Form Data
  const savedData = localStorage.getItem('schemeFormDraft');
  if (savedData) {
    const data = JSON.parse(savedData);
    for (const key in data) {
      const el = document.getElementById(key);
      if (el) el.value = data[key];
    }
  }

  // Auto-save Form
  const eligibilityForm = document.getElementById('eligibility-form');
  eligibilityForm.addEventListener('input', () => {
    const formData = new FormData(eligibilityForm);
    const dataObj = Object.fromEntries(formData.entries());
    localStorage.setItem('schemeFormDraft', JSON.stringify(dataObj));
  });

  // Clear Form
  document.getElementById('clear-form').addEventListener('click', () => {
    eligibilityForm.reset();
    localStorage.removeItem('schemeFormDraft');
    showToast('Form fields cleared successfully', 'success');
  });

  // Handle Form Submit
  eligibilityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(eligibilityForm);
    const dataObj = Object.fromEntries(formData.entries());
    
    dataObj.age = parseInt(dataObj.age);
    dataObj.annualIncome = parseInt(dataObj.annualIncome);
    
    document.getElementById('loading-state').classList.remove('hidden');
    
    try {
      const response = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const result = await response.json();
      renderResults(result.eligibleSchemes);
      
      const resultsSection = document.getElementById('results');
      resultsSection.classList.remove('hidden');
      setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      showToast('Eligibility checked successfully!', 'success');
      
    } catch (error) {
      console.error(error);
      showToast('Failed to check eligibility. Please try again.', 'error');
    } finally {
      document.getElementById('loading-state').classList.add('hidden');
    }
  });

  // Render Results
  const renderResults = (schemes) => {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    if (!schemes || schemes.length === 0) {
      container.innerHTML = `<div class="p-12 text-center bg-slate-50 dark:bg-dark-card rounded-3xl border border-slate-200 dark:border-dark-border col-span-full">
        <div class="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-search text-3xl text-slate-400"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3 text-slate-800 dark:text-white">No exactly matching schemes found</h3>
        <p class="text-slate-500 text-lg">Try updating your profile details to discover more schemes.</p>
      </div>`;
      return;
    }

    schemes.forEach((scheme, index) => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-[2rem] overflow-hidden reveal-up active hover:shadow-soft transition-all duration-300';
      card.style.animationDelay = `${index * 0.1}s`;
      
      const benefitsHTML = scheme.benefits ? scheme.benefits.map(b => `<li class="flex gap-3 items-start"><i class="fa-solid fa-check-circle text-brand-green mt-1 flex-shrink-0 text-sm"></i><span class="font-medium text-slate-700 dark:text-slate-300">${b}</span></li>`).join('') : '';
      
      const docsHTML = scheme.requiredDocuments ? scheme.requiredDocuments.map(d => `<span class="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-dark-border mb-2 mr-2"><i class="fa-regular fa-file-lines mr-1.5"></i> ${d}</span>`).join('') : '';

      card.innerHTML = `
        <div class="h-2 bg-gradient-to-r from-brand-saffron via-brand-navy to-brand-green"></div>
        <div class="p-8">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
            <div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">${scheme.schemeName}</h3>
              <div class="flex items-center gap-2">
                ${scheme.stateSpecific ? '<span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300 tracking-wider uppercase">State Scheme</span>' : '<span class="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 tracking-wider uppercase">Central Scheme</span>'}
                ${scheme.schemeCategory ? `<span class="text-xs text-slate-500 font-semibold">${scheme.schemeCategory}</span>` : ''}
              </div>
            </div>
            
            ${scheme.eligibilityScore ? `
            <!-- Score removed per request -->
            ` : ''}
          </div>
          
          <div class="mb-6 p-5 bg-brand-saffron/10 dark:bg-brand-saffron/5 rounded-2xl border border-brand-saffron/20 dark:border-brand-saffron/10">
            <h4 class="text-sm font-extrabold text-brand-saffron flex items-center gap-2 mb-2 tracking-wide uppercase"><i class="fa-solid fa-bullseye"></i> Why you are eligible</h4>
            <p class="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">${scheme.eligibilityReason}</p>
          </div>
          
          <div class="mb-6">
            <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Key Benefits</h4>
            <ul class="space-y-3">
              ${benefitsHTML}
            </ul>
          </div>
          
          <div class="mb-6">
            <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Required Documents</h4>
            <div class="flex flex-wrap">${docsHTML}</div>
          </div>
          
          <div class="mb-8">
            <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Application Process</h4>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">${scheme.applicationProcess}</p>
          </div>
          
          <div class="pt-6 border-t border-slate-200 dark:border-dark-border flex flex-col sm:flex-row justify-between items-center gap-4">
            ${scheme.deadline ? `<span class="text-sm text-red-500 font-bold flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg"><i class="fa-regular fa-clock"></i> Deadline: ${scheme.deadline}</span>` : '<div></div>'}
            ${scheme.officialLink ? `<a href="${scheme.officialLink}" target="_blank" class="btn-primary px-6 py-2.5 w-full sm:w-auto text-sm"><i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Official Portal</a>` : ''}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  };


  // Load Popular Schemes
  const loadPopularSchemes = async () => {
    try {
      const response = await fetch('/api/schemes');
      const schemes = await response.json();
      
      const container = document.getElementById('popular-schemes-container');
      schemes.forEach(scheme => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-[1.5rem] hover:shadow-soft transition-all duration-300 p-8 flex flex-col h-full group bg-white dark:bg-dark-card';
        
        card.innerHTML = `
          <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-saffronLight transition-all">
            <i class="fa-solid fa-landmark text-brand-navy dark:text-white group-hover:text-brand-saffron transition-colors"></i>
          </div>
          <h3 class="text-xl font-extrabold mb-3 text-slate-900 dark:text-white group-hover:text-brand-saffron transition-colors">${scheme.name}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow font-medium">${scheme.description}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${scheme.tags.map(tag => `<span class="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">${tag}</span>`).join('')}
          </div>
          <a href="${scheme.link}" target="_blank" class="text-brand-navy dark:text-white font-bold hover:text-brand-saffron dark:hover:text-brand-saffron transition-colors flex items-center gap-2 mt-auto">Learn more <i class="fa-solid fa-arrow-right text-sm"></i></a>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error('Failed to load popular schemes', error);
    }
  };

  loadPopularSchemes();

  // Load FAQ
  const faqs = [
    { q: "Is SchemeSathi an official government website?", a: "No, SchemeSathi is an independent AI-powered platform created to help citizens discover government schemes easily. Always refer to official government portals for final applications." },
    { q: "Is my personal data completely safe?", a: "Yes. We do not store your personal details permanently. The information is only processed temporarily during your session by our AI to match you with suitable schemes, and is immediately discarded." },
    { q: "Does this include state-specific schemes?", a: "Absolutely. Our AI engine is programmed to identify both central government programs and specific schemes available in the state you select during the profile check." },
    { q: "Can I apply for the schemes directly here?", a: "No, SchemeSathi serves as a discovery and eligibility engine. We provide direct links to the official government portals where you can securely complete your actual application." }
  ];

  const faqContainer = document.getElementById('faq-container');
  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'glass-card border border-slate-200 dark:border-dark-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-sm bg-white dark:bg-dark-card';
    
    const btn = document.createElement('button');
    btn.className = 'w-full px-8 py-6 text-left font-bold text-lg text-slate-800 dark:text-white flex justify-between items-center focus:outline-none group';
    btn.innerHTML = `
      ${faq.q}
      <div class="faq-icon w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 transition-all duration-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 shrink-0 ml-4">
        <i class="fa-solid fa-chevron-down text-sm"></i>
      </div>
    `;
    
    const ans = document.createElement('div');
    ans.className = 'hidden px-8 pb-6 text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium';
    ans.textContent = faq.a;
    
    btn.addEventListener('click', () => {
      ans.classList.toggle('hidden');
      const icon = btn.querySelector('.faq-icon');
      icon.classList.toggle('rotate-180');
      icon.classList.toggle('bg-brand-saffron');
      icon.classList.toggle('text-white');
    });
    
    item.appendChild(btn);
    item.appendChild(ans);
    faqContainer.appendChild(item);
  });
});
