 import React, { useState } from 'react';
import { FaTimes,FaExclamationTriangle  } from 'react-icons/fa';
import './createproject.css';
import  { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {
 
  const [jobTitle, setJobTitle] = useState('');
  const [prize, setPrize] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [scope, setScope] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [projectOutline, setProjectOutline] = useState('');
  const [expectedDelivery, setExpectedDelivery] = useState(''); // New state for expected delivery
  const [selectedSkills, setSelectedSkills] = useState([]);
    const availableSkills = [
      'Web Development',
      'Mobile App Development',
      'Graphic Design',
      'Data Entry',
      'Content Writing',
      'Digital Marketing',
      'Photography',
      'Video Editing',
      'Customer Service',
      'Sales',
      'SEO/SEM',
      'Project Management'
    ];
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
      jobTitle: '',
      prize: '',
      description: '',
      jobType: '',
      scope: '',
      experienceLevel: '',
      projectOutline: '',
      selectedSkillsskills: []
    });
 
  const handleScopeChange = (value) => {
    setScope(value);
  };

  const handleExperienceLevelChange = (value) => {
    setExperienceLevel(value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
   // Check if description meets minimum length requirement
  };
  const handleProjectOutlineChange = (e) => {
    const value = e.target.value;
    setProjectOutline(value);
  };
  const toggleSkillsDropdown = () => {
    setShowSkillsDropdown(!showSkillsDropdown);
  };

  const handleSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  const handleExpectedDeliveryChange = (e) => {
    setExpectedDelivery(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      const regobj = {
        jobTitle,
        prize,
        description,
        jobType,
        scope,
        experienceLevel,
        projectOutline,
        selectedSkills,expectedDelivery
      };
  try {
const response= await fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regobj)
      })
      if (response.ok) {
        console.log('Form data submitted successfully!');
        const data = await response.json(); // Optionally, you can perform additional actions here after successful submission
        toast.success("Form data submitted successfully!");
        navigate('/clientpage'); // Redirect to clientpage after successful submission
      } else {
        throw new Error('Failed to submit form data');
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed: " + err.message);
    }
  }
};





  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black shadow-md shadow-green-500 rounded-xl w-full max-w-md h-3 p-6 overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => navigate('/clientpage')}
            className="border-0 bg-transparent focus:outline-none absolute -top-2 -right-2"
          >
            <FaTimes />
          </button>
          <div>
            <h3 className="text-xl font-bold mb-8">Create a Project</h3>
            <form className="" onSubmit={handleSubmit}>
              <div className="mb-5 flex flex-col space-y4">
                <label className='mb-2' htmlFor="jt">Write a Job Title</label>
                <input
                  id="jt"
                  value={jobTitle}
                  placeholder="e.g. logo designer..."
                  type="text"
                  className="rounded-md text-sm"
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5 flex flex-col space-y4">
                <label className="block mb-2 font-bold" htmlFor="jt">Project Outline</label>
                <textarea
                  id="jt"
                  value={projectOutline}
                  placeholder="e.g. Decentralised Freelancing Platfrom using BLockchain and React."
                  className="rounded-md focus:outline-none focus:ring-0 text-sm"
                  onChange={handleProjectOutlineChange}
                  
                ></textarea>
                </div>
              <div className="mb-5">
                <label className="block mb-2">Terms of Project</label>
                <div>
                  <label className="inline-flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      className="rounded border-gray-300 mr-2 "
                      value="long-term"
                      checked={jobType === 'long-term'}
                      onChange={() => setJobType('long-term')}
                    />
                    Long Term Project
                    <span className="ml-2 text-gray-500 text-sm">
                      (More than thirty hours a week and/or will be longer than three months.)
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="rounded border-gray-300 mr-2"
                      value="short-term"
                      checked={jobType === 'short-term'}
                      onChange={() => setJobType('short-term')}
                    />
                    Short Term Project
                    <span className="ml-2 text-gray-500 text-sm">
                      (Less than thirty hours a week and/or will be shorter than three months.)
                    </span>
                  </label>
                </div>
              </div>

              <div className="mb-5 flex flex-col space-y-1">
                <label className='mb-2' htmlFor="desc">Expected Pay </label>
                <input
                  id="number"
                  value={prize}
                  placeholder="Mention total expected amount"
                  step={1}
                  type="text"
                  className="rounded-md text-sm"
                  onChange={(e) => setPrize(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 font-bold">Scope of Project</label>
                <div>
                  <label className="inline-flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      className="rounded border-gray-300 mr-2"
                      value="large"
                      checked={scope === 'large'}
                      onChange={() => handleScopeChange('large')}
                    />
                    Large
                    <span className="ml-2 text-gray-500 text-sm">
        Longer term or complex initiatives
        (ex. develop and execute a brand strategy
        (i.e., graphics, postioning))
      </span>
                  </label>
                 
                  <label className="inline-flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      className="rounded border-gray-300 mr-2"
                      value="medium"
                      checked={scope === 'medium'}
                      onChange={() => handleScopeChange('medium')}
                    />
                    Medium
                    <span className="ml-2 text-gray-500 text-sm">
        Well-defined projects
        (ex. design business rebrand package
        (i.e., logos,icons))
      </span>
                  </label>
                
                  <label className="inline-flex items-center mb-5">
                    <input
                      type="radio"
                      className="rounded border-gray-300 mr-2"
                      value="small"
                      checked={scope === 'small'}
                      onChange={() => handleScopeChange('small')}
                    />
                    Small
                    <span className="ml-2 text-gray-500 text-sm">
     Quick and straightforward tasks
        (ex. craete logo for a new product)
      </span>
                  </label>
                </div>
              </div>
              <div className="mb-5 flex flex-col space-y4">
          <label className="mb-2" htmlFor="expectedDelivery">
            Expected Delivery
          </label>
          <input
            id="expectedDelivery"
            value={expectedDelivery}
            type="text"
            placeholder="within 1 week, 1 month..."
            className="rounded-md text-sm"
            onChange={handleExpectedDeliveryChange}
            required
          />
        </div>
              <div className="mb-5">
                <label className="block mb-2 font-bold">Experience Level Needed</label>
                <div>
                  <label className="inline-flex items
-center mr-4 mb-5">
<input
  type="checkbox"
  className="rounded border-gray-300 mr-2"
  value="entry"
  checked={experienceLevel === 'entry'}
  onChange={() => handleExperienceLevelChange('entry')}
/>
Entry
<span className="ml-2 text-gray-500 text-sm">
Looking for someone relatively new to this field
</span>
</label>
<label className="inline-flex items-center mr-4 mb-5">
<input
  type="checkbox"
  className="rounded border-gray-300 mr-2"
  value="intermediate"
  checked={experienceLevel === 'intermediate'}
  onChange={() => handleExperienceLevelChange('intermediate')}
/>
Intermediate
<span className="ml-2 text-gray-500 text-sm">
Looking for substantial expertise in this field
</span>
</label>
<label className="inline-flex items-center mb-5">
<input
  type="checkbox"
  className="rounded border-gray-300 mr-2"
  value="expert"
  checked={experienceLevel === 'expert'}
  onChange={() => handleExperienceLevelChange('expert')}
/>
Expert
<span className="ml-2 text-gray-500 text-sm">
Looking for comprehensive and deep expertise  in this field
</span>
</label>
</div>
</div>
<div className="mb-5 col-lg-12">
                <div className="form-group category-box">
                  <label>Job Category</label>
                  <div className="input-group">
                    <input
                      value={selectedSkills.join(', ')}
                      readOnly
                      className="form-control"
                      onClick={toggleSkillsDropdown}
                    />
                    {showSkillsDropdown && (
                      <div className="skills-dropdown ">
                        {availableSkills.map((skill, index) => (
                          <div
                            key={index}
                            className={`skill-item ${
                              selectedSkills.includes(skill) ? 'active' : ''
                            }`}
                            onClick={() => handleSkillClick(skill)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-5 flex flex-col space-y-1">
                <label htmlFor="desc" className="block mb-2 font-bold">
                  Description
                </label>
                <div className="flex items-center">
                  <textarea
                    id="desc"
                    value={description}
                    className="w-full rounded-b-md focus:outline-none focus:ring-0 text-sm"
                    onChange={handleDescriptionChange}
                    required
                  ></textarea>
                  </div>
                  <p className="text-red-500 text-sm warning-message">
                    <FaExclamationTriangle className="mr-2 " /> Description must be at least 50 characters long.
                  </p>
      
              </div>
<button type ='submit' className="btn btn-primary px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50"
onClick={handleSubmit}>
Create
</button>

</form>
</div>
</div>
</div>
</div>
);
};

export default CreateProject;
