document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MKP FRAGRANCES INFORMATION
    ========================================= */

    const cardInfo = {
        name: "MKP Fragrances",
        phone: "+233208974917",
        email: "youremail@example.com",

        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        whatsapp: "https://wa.me/233208974917"
    };


    /* =========================================
       GET ELEMENTS
    ========================================= */

    const qrTopBtn = document.getElementById("qrTopBtn");
    const qrModal = document.getElementById("qrModal");
    const closeModal = document.getElementById("closeModal");

    const modalQRCode = document.getElementById("modalQRCode");

    const shareQRBtn = document.getElementById("shareQRBtn");
    const copyLinkBtn = document.getElementById("copyLinkBtn");

    const copyBtn = document.getElementById("copyBtn");
    const contactBtn = document.getElementById("contactBtn");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const year = document.getElementById("year");


    /* =========================================
       CURRENT YEAR
    ========================================= */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================================
       DIGITAL BUSINESS CARD URL
    ========================================= */

    const cardURL = window.location.href;


    /* =========================================
       GENERATE QR CODE
    ========================================= */

    if (modalQRCode && typeof QRCode !== "undefined") {

        modalQRCode.innerHTML = "";

        new QRCode(modalQRCode, {
            text: cardURL,
            width: 230,
            height: 230,

            colorDark: "#06152f",
            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H
        });

    }


    /* =========================================
       OPEN QR CODE POPUP
    ========================================= */

    if (qrTopBtn && qrModal) {

        qrTopBtn.addEventListener("click", function (event) {

            event.preventDefault();

            qrModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    }


    /* =========================================
       CLOSE QR POPUP
    ========================================= */

    if (closeModal && qrModal) {

        closeModal.addEventListener("click", function () {

            closeQRPopup();

        });

    }


    /* =========================================
       CLOSE WHEN CLICKING OUTSIDE
    ========================================= */

    if (qrModal) {

        qrModal.addEventListener("click", function (event) {

            if (event.target === qrModal) {

                closeQRPopup();

            }

        });

    }


    /* =========================================
       CLOSE WITH ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeQRPopup();

        }

    });


    /* =========================================
       QR POPUP CLOSE FUNCTION
    ========================================= */

    function closeQRPopup() {

        if (!qrModal) return;

        qrModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    /* =========================================
       SHARE MKP FRAGRANCES QR LINK
    ========================================= */

    if (shareQRBtn) {

        shareQRBtn.addEventListener("click", async function () {

            const shareData = {

                title: "MKP Fragrances",

                text:
                    "Discover MKP Fragrances. Scan or open this link to view our digital business card.",

                url: cardURL

            };


            /* Mobile / supported browsers */

            if (navigator.share) {

                try {

                    await navigator.share(shareData);

                    showToast("MKP Fragrances shared!");

                } catch (error) {

                    if (error.name !== "AbortError") {

                        showToast("Sharing was not completed.");

                    }

                }

            }

            /* Desktop / unsupported browsers */

            else {

                const copied = await copyToClipboard(cardURL);

                if (copied) {

                    showToast("MKP Fragrances QR link copied!");

                } else {

                    showToast("Unable to copy QR link.");

                }

            }

        });

    }


    /* =========================================
       COPY QR LINK
    ========================================= */

    if (copyLinkBtn) {

        copyLinkBtn.addEventListener("click", async function () {

            const copied = await copyToClipboard(cardURL);

            if (copied) {

                showToast("MKP Fragrances QR link copied!");

            } else {

                showToast("Unable to copy link.");

            }

        });

    }


    /* =========================================
       COPY PHONE NUMBER
    ========================================= */

    if (copyBtn) {

        copyBtn.addEventListener("click", async function () {

            const copied = await copyToClipboard(cardInfo.phone);

            if (copied) {

                showToast("Phone number copied!");

            } else {

                showToast("Unable to copy number.");

            }

        });

    }


    /* =========================================
       SAVE CONTACT
    ========================================= */

    if (contactBtn) {

        contactBtn.addEventListener("click", function () {

            const vCard =
`BEGIN:VCARD
VERSION:3.0
FN:${cardInfo.name}
ORG:MKP Fragrances
TEL:${cardInfo.phone}
EMAIL:${cardInfo.email}
URL:${cardURL}
X-SOCIALPROFILE;type=facebook:${cardInfo.facebook}
X-SOCIALPROFILE;type=instagram:${cardInfo.instagram}
X-SOCIALPROFILE;type=tiktok:${cardInfo.tiktok}
END:VCARD`;


            const blob = new Blob(
                [vCard],
                {
                    type: "text/vcard"
                }
            );


            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download = "MKP_Fragrances_Contact.vcf";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

            showToast("MKP Fragrances contact saved!");

        });

    }


    /* =========================================
       COPY TO CLIPBOARD
    ========================================= */

    async function copyToClipboard(text) {

        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {

                await navigator.clipboard.writeText(text);

                return true;

            }


            /* Fallback for older browsers */

            const textarea = document.createElement("textarea");

            textarea.value = text;

            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);

            textarea.focus();

            textarea.select();

            const successful =
                document.execCommand("copy");

            document.body.removeChild(textarea);

            return successful;

        }

        catch (error) {

            console.error("Copy failed:", error);

            return false;

        }

    }


    /* =========================================
       TOAST MESSAGE
    ========================================= */

    function showToast(message) {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);

    }


});