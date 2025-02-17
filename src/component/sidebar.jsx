import React, { useState } from "react";
import "../SideNavbar.css"; // Assuming you will style it in an external CSS file
import { GoCopilot } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { GrDashboard } from "react-icons/gr";
import { FaAws } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbLicense } from "react-icons/tb";
import { TbBrandOpenSource } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { SiGithubcopilot } from "react-icons/si";

const SideNavbar = ({ active, setActive }) => {
  const handleItemClick = (item) => {
    console.log(item, "jskjksjkjhdbvf");
    setActive(item);
  };

  console.log(active, "active===---");

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLicensedOpen, setIsLicensedOpen] = useState(false);
  const [isOpenSourceOpen, setIsOpenSourceOpen] = useState(false);
  const [isRepositoryOpen, setIsRepositoryOpen] = useState(false);
  const [isAddRepositoryOpen, setIsAddRepositoryOpen] = useState(false);
  const [isHuggingfaceOpen, setIsHuggingfaceOpen] = useState(false);
  const handleAdminClick = () => {
    setIsAdminOpen((prev) => !prev); // Toggle the submenu visibility
  };
  const handleLicensedClick = () => {
    setIsOpenSourceOpen(false);
    setIsLicensedOpen((prev) => !prev); // Toggle the submenu visibility
  };
  const handleOpenSourceClick = () => {
    setIsLicensedOpen(false);
    setIsOpenSourceOpen((prev) => !prev); // Toggle the submenu visibility
  };
  const handleHuggingfaceClick = () => {
    console.log("=================");
    setIsOpenSourceOpen(false);
    setIsHuggingfaceOpen((prev) => !prev); // Toggle the submenu visibility
  };
  const handleItemsClick = (item) => {
    console.log(`${item} clicked`);
    // Additional logic for handling item clicks
  };
  const handleRepositoryClick = () => {
    setIsRepositoryOpen((prev) => !prev); // Toggle the submenu visibility
  };
  const handleAddRepositoryClick = () => {
    console.log("handleAddRepositoryClick");
    setIsRepositoryOpen(false);
    setIsAddRepositoryOpen((prev) => !prev); // Toggle the submenu visibility
  };

  const handleDeleteRepositoryClick = (e) => {
    console.log("handleDeleteRepositoryClick");
    e.stopPropagation();
    setIsRepositoryOpen(false);
  };

  const handleGitHubCopilotClick = () => {
    console.log("handleGitHubCopilotClick");
  };

  const handleGoogleGeminiClick = () => {
    console.log("handleGoogleGeminiClick");
  };

  return (
    <div className="side-navbar">
      <nav>
        <ul data-submenu-title="Home">
          <li
            className={active === "Dashboard" ? "active" : "navigation"}
            onClick={() => handleItemClick("Dashboard")}
            style={{ fontStyle: "italic", fontWeight: "600" }}
          >
            <Link
              to="/"
              className={active === "Dashboard" ? "active" : "navigation"}
              onClick={() => handleItemClick("Dashboard")}
            >
              <GrDashboard className="sidebar-icons" />
              &nbsp; Dashboard
            </Link>
          </li>
          <li
            className={active === "Services" ? "active" : "navigation"}
            onClick={() => handleItemClick("Services")}
            style={{ fontStyle: "italic", fontWeight: "600" }}
          >
            <Link
              to="/services"
              className={active === "Services" ? "active" : "navigation"}
              onClick={() => handleItemClick("Services")}
            >
              <BiSolidOffer className="sidebar-icons" />
              &nbsp; Offerings
            </Link>
          </li>
        </ul>
        <ul data-submenu-title="AI Assistant">
          <li onClick={handleGitHubCopilotClick} style={{ textAlign: "left" }}>
            <Link style={{ fontWeight: "600" }}>
              <SiGithubcopilot className="sidebar-icons" />
              &nbsp; GitHub Copilot
            </Link>
          </li>

          <li onClick={handleGoogleGeminiClick}>
            <Link style={{ fontWeight: "600" }}>
              <SiGooglegemini className="sidebar-icons" />
              &nbsp; Google Gemini
            </Link>
          </li>
        </ul>
        <ul data-submenu-title="AI Model">
          <li onClick={handleLicensedClick} style={{ textAlign: "left" }}>
            <Link style={{ fontWeight: "600" }}>
              <TbLicense className="sidebar-icons" />
              &nbsp; Licensed
            </Link>

            {isLicensedOpen && ( // Render submenu only when isLicensedOpen is true
              <ul onClick={handleLicensedClick}>
                <li onClick={() => handleItemClick("Copilot-o1 mini")}>
                  <Link
                    to="/copilot-mini"
                    className={
                      active === "Copilot-o1-mini" ? "active" : "navigation"
                    }
                  >
                    Copilot-o1 mini
                  </Link>
                </li>
                <li onClick={() => handleItemClick("Copilot-o1 Preview")}>
                  <Link
                    to="/copilot-preview"
                    className={
                      active === "Copilot-o1-Preview" ? "active" : "navigation"
                    }
                  >
                    Copilot-o1 Preview
                  </Link>
                </li>
                <li onClick={() => handleItemClick("Copilot-Gpt-4o")}>
                  <Link
                    to="/copilot-gpt"
                    className={
                      active === "Copilot-Gpt-4o" ? "active" : "navigation"
                    }
                  >
                    Copilot-Gpt-4o
                  </Link>
                </li>
                <li onClick={() => handleItemClick("Gemini-Gemini 1.5")}>
                  <Link
                    to="/gemini-ai"
                    className={
                      active === "Gemini-Gemini 1.5"
                        ? "active"
                        : "navigation"
                    }
                  >
                    Gemini-Gemini 1.5
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          <li onClick={handleOpenSourceClick}>
            <Link style={{ fontWeight: "600", fontStyle: "italic" }}>
              <TbBrandOpenSource className="sidebar-icons" />
              &nbsp; Open Source
            </Link>

            {isOpenSourceOpen && ( // Render submenu only when isLicensedOpen is true
              <ul onClick={handleHuggingfaceClick}>
                <li onClick={() => handleItemClick("Hugging face")}>
                  <Link
                    style={{ fontWeight: "600" }}
                    to=""
                    className={
                      active === "Hugging face" ? "active" : "navigation"
                    }
                  >
                    Hugging face
                  </Link>
                  {isHuggingfaceOpen && ( // Render submenu only when isLicensedOpen is true
                    <ul onClick={handleHuggingfaceClick}>
                      <li
                        onClick={() =>
                          handleItemClick("CodeLlama/CodeLlama-34B-Instruct-hf")
                        }
                      >
                        <Link
                          to="/hf-code-llama"
                          className={
                            active === "CodeLlama/CodeLlama-34B-Instruct-hf"
                              ? "active"
                              : "navigation"
                          }
                        >
                          CodeLlama/CodeLlama-34B-Instruct-hf
                        </Link>
                      </li>
                      <li
                        onClick={() =>
                          handleItemClick("Microsoft/Phi-3.5-mini-Instruct")
                        }
                      >
                        <Link
                          to="/hf-microsoft-phi"
                          className={
                            active === "Microsoft/Phi-3.5-mini-Instruct"
                              ? "active"
                              : "navigation"
                          }
                        >
                          Microsoft/Phi-3.5-mini-Instruct
                        </Link>
                      </li>
                      <li
                        onClick={() =>
                          handleItemClick(
                            "Mistralai/Mistral-nemo-Instruct-2407"
                          )
                        }
                      >
                        <Link
                          to="/hf-mistral-nemo"
                          className={
                            active === "Mistralai/Mistral-nemo-Instruct-2407"
                              ? "active"
                              : "navigation"
                          }
                        >
                          Mistralai/Mistral-nemo-Instruct-2407
                        </Link>
                      </li>
                      <li
                        onClick={() =>
                          handleItemClick("Nousresearch/Hermes-3-Llama-3.1-8B")
                        }
                      >
                        <Link
                          to="/hf-nousresearch-hermes"
                          className={
                            active === "Nousresearch/Hermes-3-Llama-3.1-8B"
                              ? "active"
                              : "navigation"
                          }
                        >
                          Nousresearch/Hermes-3-Llama-3.1-8B
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={() => handleItemClick("Anthropic")}>
                  <Link
                    style={{ fontWeight: "600" }}
                    to="#"
                    className={active === "Anthropic" ? "active" : "navigation"}
                  >
                    Anthropic
                  </Link>
                </li>
                <li onClick={() => handleItemClick("Meta")}>
                  <Link
                    style={{ fontWeight: "600" }}
                    to="#"
                    className={active === "Meta" ? "active" : "navigation"}
                  >
                    Meta
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        {/* <ul style={{ marginLeft: "10px" }} data-submenu-title="AI Model">
          <li
            className={active === "Copilot" ? "active" : "navigation"}
            onClick={() => handleItemClick("Copilot")}
          >
            <Link
              to="/copilot"
              className={active === "Copilot" ? "active" : "navigation"}
              onClick={() => handleItemClick("Copilot")}
            >
              <GoCopilot />
              &nbsp; Copilot
            </Link>
          </li>
          <li
            className={active === "Gemini" ? "active" : "navigation"}
            onClick={() => handleItemClick("Gemini")}
          >
            <Link
              to="/gemini-ai"
              className={active === "Gemini" ? "active" : "navigation"}
              onClick={() => handleItemClick("Gemini")}
            >
              <SiGooglegemini />
              &nbsp; Gemini
            </Link>
          </li>

          <li
            className={
              active === "GitHub Copilot CLI" ? "active" : "navigation"
            }
            onClick={() => handleItemClick("GitHub Copilot CLI")}
          >
            <Link
              to="/github-copilot-cli"
              className={
                active === "GitHub Copilot CLI" ? "active" : "navigation"
              }
              onClick={() => handleItemClick("GitHub Copilot CLI")}
            >
              <RiRobot3Line />
              &nbsp; GitHub Copilot CLI
            </Link>
          </li>

          <li
            className={
              active === "AWS Bedrock" ? "active" : "navigation"
            }
            onClick={() => handleItemClick("AWS Bedrock")}
          >
            <Link
              to="/aws-bedrock"
              className={
                active === "AWS Bedrock" ? "active" : "navigation"
              }
              onClick={() => handleItemClick("AWS Bedrock")}
            >
              <FaAws />
              &nbsp; AWS Bedrock
            </Link>
          </li>
        </ul> */}
        <ul data-submenu-title="Settings">
          <li
            onClick={() => handleItemClick("Users")}
            style={{ fontStyle: "italic", fontWeight: "600" }}
          >
            <Link to="/user-list">
              <FaUsers className="sidebar-icons" /> &nbsp; Users
            </Link>
          </li>
          <li onClick={handleRepositoryClick} style={{ textAlign: "left" }}>
            <Link style={{ fontWeight: "600" }}>
              <RiGitRepositoryCommitsFill />
              &nbsp; Repository
            </Link>

            {isRepositoryOpen && ( // Render submenu only when isRepositoryOpen is true
              <ul onClick={handleAddRepositoryClick}>
                <li onClick={() => handleItemClick("Add Repository")}>
                  <Link
                    to="/addrepo"
                    className={
                      active === "Add Repository" ? "active" : "navigation"
                    }
                  >
                    Add Repository
                  </Link>
                </li>

                <li onClick={handleDeleteRepositoryClick}>
                  <Link
                    to="/deleterepo"
                    className={
                      active === "Delete Repository" ? "active" : "navigation"
                    }
                  >
                    Delete Repository
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SideNavbar;
