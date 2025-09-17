import { featureCardData } from "@/lib/data";
import Image from "next/image";
import React from "react";

function FeaturesCard() {
  return (
    <>
      <div className="feature-area fa-negative">
        <div className="col-xl-9 ms-auto">
          <div className="feature-wrapper">
            <div className="row g-4">
              {featureCardData.map((feature, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="feature-item">
                    <span className="count">0{index + 1}</span>
                    <div className="feature-icon flex justify-center">
                      <Image src={feature.img} alt="" width={20} height={20} />
                    </div>
                    <div className="feature-content">
                      <h4 className="feature-title">{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturesCard;
