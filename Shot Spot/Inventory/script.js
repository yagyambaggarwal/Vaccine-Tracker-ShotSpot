document.addEventListener("DOMContentLoaded", () => {
    // --- DATA (This would be fetched from a backend API) ---
    const hospitalData = {
        name: "Sunrise Community Hospital",
        location: "Nairobi, Kenya",
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        contact: "+254 712 345678",
        incharge: "Dr. Jane Doe",
    };

    const vaccineData = [
        {
            name: "BCG",
            batches: [
                { batchNumber: "BCG001", expiryDate: "2025-12-01", dateReceived: "2025-06-15", inStock: 120, ordered: null },
                { batchNumber: "BCG003", expiryDate: "2026-03-01", dateReceived: null, inStock: 0, ordered: "2025-09-10" },
            ],
        },
        {
            name: "OPV",
            batches: [
                { batchNumber: "OPV001", expiryDate: "2025-10-15", dateReceived: "2025-05-12", inStock: 90, ordered: null },
            ],
        },
        {
            name: "Hepatitis B",
            batches: [
                { batchNumber: "HEPB001", expiryDate: "2026-01-01", dateReceived: "2025-08-01", inStock: 150, ordered: null },
                { batchNumber: "HEPB002", expiryDate: "2026-05-01", dateReceived: null, inStock: 0, ordered: "2025-09-20" },
            ],
        },
        {
            name: "Pentavalent",
            batches: [
                { batchNumber: "PENTA001", expiryDate: "2025-11-11", dateReceived: "2025-07-01", inStock: 75, ordered: null },
            ],
        },
        {
            name: "Rotavirus (RVV)",
            batches: [
                { batchNumber: "RVV001", expiryDate: "2026-03-15", dateReceived: "2025-06-20", inStock: 60, ordered: null },
            ],
        },
    ];

    // --- RENDER FUNCTIONS ---

    function renderHospitalInfo() {
        const container = document.getElementById("hospitalInfo");
        if (!container) return;

        container.innerHTML = `
            <p><strong>Health Facility:</strong> ${hospitalData.name}</p>
            <p><strong>Location:</strong> ${hospitalData.location}</p>
            <p><strong>UUID:</strong> ${hospitalData.uuid}</p>
            <p><strong>Contact:</strong> ${hospitalData.contact}</p>
            <p><strong>In-charge:</strong> ${hospitalData.incharge}</p>
        `;
    }

    // function createBatchTable(batches) {
    //     let rows = batches.map(batch => `
    //         <tr>
    //             <td>${batch.batchNumber}</td>
    //             <td>${batch.expiryDate || '-'}</td>
    //             <td>${batch.dateReceived || '-'}</td>
    //             <td>${batch.inStock}</td>
    //             <td>${batch.ordered || '-'}</td>
    //         </tr>
    //     `).join('');

    //     return `
    //         <table class="batch-table">
    //             <thead>
    //                 <tr>
    //                     <th>Batch #</th>
    //                     <th>Expiry</th>
    //                     <th>Received</th>
    //                     <th>In Stock</th>
    //                     <th>Ordered</th>
    //                 </tr>
    //             </thead>
    //             <tbody>${rows}</tbody>
    //         </table>
    //     `;
    // }

    function createBatchTable(batches) {
    const today = new Date();

    let rows = batches.map(batch => {
        let expiryClass = '';
        if (batch.expiryDate) {
            const expiryDate = new Date(batch.expiryDate);
            expiryClass = expiryDate < today ? 'expired' : 'valid';
        }

        return `
            <tr>
                <td>${batch.batchNumber}</td>
                <td class="${expiryClass}">${batch.expiryDate || '-'}</td>
                <td>${batch.dateReceived || '-'}</td>
                <td>${batch.inStock}</td>
                <td>${batch.ordered || '-'}</td>
            </tr>
        `;
    }).join('');

    return `
        <table class="batch-table">
            <thead>
                <tr>
                    <th>Batch #</th>
                    <th>Expiry</th>
                    <th>Received</th>
                    <th>In Stock</th>
                    <th>Ordered</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}


    function renderVaccines() {
        const container = document.getElementById("vaccineContainer");
        if (!container) return;
        
        container.innerHTML = ''; // Clear previous content

        vaccineData.forEach((vaccine, idx) => {
            const cardId = `batch-details-${idx}`;
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            
            card.innerHTML = `
                <h3>${vaccine.name}</h3>
                <button data-target-id="${cardId}">View Details</button>
                <div class="batch-details" id="${cardId}">
                    ${createBatchTable(vaccine.batches)}
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // --- EVENT HANDLING ---

    function setupEventListeners() {
        const container = document.getElementById("vaccineContainer");
        container.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const targetId = event.target.getAttribute('data-target-id');
                toggleDetails(targetId);
            }
        });
    }
    
    function toggleDetails(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('visible');
        }
    }
    
    // --- INITIALIZATION ---

    function init() {
        // In a real application, you would fetch data here first
        // e.g., fetchHospitalData().then(() => renderHospitalInfo());
        renderHospitalInfo();
        renderVaccines();
        setupEventListeners();
    }

    init();
});
