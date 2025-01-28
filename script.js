document.getElementById('generate-pdf').addEventListener('click', generatePDF);

const potato = document.getElementById('potato');
const rotationCountElem = document.getElementById('rotation-count');
const userName = document.getElementById('user-name');
let rotationCount = 0;

// Set up the rotation animation and increase the counter on each full rotation
potato.style.animation = 'spin 1.3s linear infinite';
potato.addEventListener('animationiteration', () => {
    rotationCount += 1;
    rotationCountElem.textContent = rotationCount;
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape'); // Create a horizontal (landscape) PDF

    // Page width in landscape mode
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add title with improved styling and centered
    const title = "The Infinite Potato Certificate";
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2; // Calculate the X position to center the title
    doc.text(title, titleX, 30);

    // Correctly size the image and maintain proportions, and center it
    const imgWidth = 180; // Adjust width to fit within the page while maintaining aspect ratio
    const imgHeight = (imgWidth / 1024) * 723; // Calculate height based on original proportions
    const imgX = (pageWidth - imgWidth) / 2; // Center the image horizontally
    const imgData = potato.src;
    doc.addImage(imgData, 'PNG', imgX, 40, imgWidth, imgHeight);

    // Get the value of the userName input
    const userNameValue = userName.value;

    // Add the certification text with the name, on its own line and centered
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    const certText = `This is to certify that ${userNameValue} has achieved a total of: `;
    const certTextWidth = doc.getTextWidth(certText);
    const certTextX = (pageWidth - certTextWidth) / 2;
    doc.text(certText, certTextX, imgHeight + 45);

    // Add the number of potato spins, bold, slightly larger, and centered
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const spinsText = `${rotationCount} Potato Spins.`;
    const spinsTextWidth = doc.getTextWidth(spinsText);
    const spinsTextX = (pageWidth - spinsTextWidth) / 2;
    doc.text(spinsText, spinsTextX, imgHeight + 55);

    // Add the hyperlink text manually with blue color and centered
    doc.setTextColor(0, 0, 255); // Set the text color to blue
    doc.setFontSize(16);
    const linkText = 'Try For Yourself at TheInfinitePotato.com';
    const linkTextWidth = doc.getTextWidth(linkText);
    const linkTextX = (pageWidth - linkTextWidth) / 2;
    doc.text(linkText, linkTextX, imgHeight + 70);

    // Add the link manually
    doc.link(linkTextX, imgHeight + 60, linkTextWidth, 10, { url: 'https://theinfinitepotato.com' });

    // Save the PDF
    doc.save('Infinite_Potato_Certificate.pdf');
}
