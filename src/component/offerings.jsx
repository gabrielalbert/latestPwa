import React from "react";
import { GrDocumentTest } from "react-icons/gr";
import { VscDebugConsole } from "react-icons/vsc";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";

import "../index.css";

function Offerings() {
  return (
    <div className="section margin-top-65">
      <div className="container" style={{ height: "1000px" }}>
        <div className="row">
          <div className="col-xl-12" style={{ height: "500px!important" }}>
            <div className="section-headline centered margin-bottom-15">
              <h3>Offerings</h3>
            </div>

            <div className="categories-container">
              <a href="#" className="category-box">
                <div className="category-box-icon">
                  <FaLaptopCode />
                </div>
                {/* <div className="category-box-counter">612</div> */}
                <div className="category-box-content">
                  <h3>Code Generation</h3>
                  <p>
                    GenAI Solution that helps developers to write faster and
                    efficient code
                  </p>
                </div>
              </a>

              <a href="/unit-test" className="category-box">
                <div className="category-box-icon">
                  <GrDocumentTest />
                </div>
                {/* <div className="category-box-counter">612</div> */}
                <div className="category-box-content">
                  <h3>Unit Test</h3>
                  <p>
                    {" "}
                    Automated unit test generation and precise code analysis.
                  </p>
                </div>
              </a>

              <a href="/layout-design" className="category-box">
                <div className="category-box-icon">
                  <VscDebugConsole />
                </div>
                {/* <div className="category-box-counter">113</div> */}
                <div className="category-box-content">
                  <h3>Bug Fix</h3>
                  <p>
                    AI-powered code checker that analyzes your code for bug fix.
                  </p>
                </div>
              </a>
              <a href="/code-conversion" className="category-box">
                <div className="category-box-icon">
                  <FaArrowRightArrowLeft />
                </div>
                {/* <div className="category-box-counter">113</div> */}
                <div className="category-box-content">
                  <h3>Code Conversion</h3>
                  <p>AI models to ensure that your code is converted.</p>
                </div>
              </a>
              <a href="/video-to-kt" className="category-box"> 
                <div className="category-box-icon">
                  <FaDatabase />
                </div>
                {/* <div className="category-box-counter">612</div> */}
                <div className="category-box-content">
                <h3>Video To KT Docs</h3>
                  <p>
                  To convert a video into a structured document like a Knowledge Transfer (KT) document using AI
                  </p>
                </div>
              </a>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offerings;
