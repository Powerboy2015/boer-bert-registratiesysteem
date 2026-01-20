import React from "react";

export default function Footer() {
    return (
        <footer className="bg-[#93DAB8] py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between text-lg">
                <a href="tel:+31642741016">📞 +31 123456789</a>
                <a href="mailto:info@campingboerbert.nl">📧 info@campingboerbert.nl</a>
                <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📍 Heidelberglaan 15
                </a>
            </div>
        </footer>
    )
}