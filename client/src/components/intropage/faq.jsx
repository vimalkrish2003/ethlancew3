import React, { useState } from 'react';
import './FAQ.css'; // Import CSS file for styling

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
    <div className="full-screen-faq-container">
      <div className="faq-item" >
        <div className="faq-question" onClick={toggleAccordion}>
          <h3 className="faq-question-text">{question}</h3>
          <div className={`faq-toggle-icon ${isOpen ? 'open' : ''}`}>&#x2B;</div>
        </div>
        {isOpen && (
          <div className="faq-answer">{answer}</div>
        )}
      </div>
      </div>

    );
};
const Accord = () => {
    return (
      <section className="py-16" id="faq">
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <h2 className="abc">Frequently Asked Questions</h2>
        
        <div className="container mx-auto px-4">
  
          {/* FAQ Items */}
          <div>
            <br/> <br/>
            <FaqItem
              question="How do I get started on Ethlance?"
              answer="To get started, sign up for an account and connect your Metamask wallet. Once connected, you can browse available jobs, submit proposals, and start earning!"
            />
            <FaqItem
              question="Is Ethlance safe and secure?"
              answer="Yes, Ethlance is built on blockchain technology, ensuring secure transactions and protecting your data. Smart contracts and decentralized identity features provide additional layers of security."
            />
            <FaqItem
              question="What kind of jobs are available on Ethlance?"
              answer="Ethlance offers a wide range of freelance opportunities across various industries, including web development, graphic design, writing, marketing, and more. You'll find jobs suited to your skills and expertise."
            />
            <FaqItem
              question="How do payments work on Ethlance?"
              answer="Payments on Ethlance are made using cryptocurrency, typically Ether (ETH). Once a job is completed and approved, payment is automatically transferred to your Metamask wallet via smart contracts."
            />
          </div>
  
        </div>
      </section>
    );
  };
  
  export default Accord; 