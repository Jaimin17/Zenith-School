"use client";

import React from "react";
import NumberSpinner from "../ui/number-spinner";
import Image from "next/image";
import { SCHOOL_STATISTIC } from "@/lib/data";

function SchoolStatistics() {

  return (
    <div className="counter-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          {SCHOOL_STATISTIC.map((stat, index) => (
            <div className="col-lg-3 col-sm-6" key={index}>
              <div className="counter-box">
                <div className="icon">
                  <Image src={stat.image} alt={stat.label + " icon"} width={300} height={300} />
                </div>
                <div>
                  <NumberSpinner trend={1} value={stat.value} />
                  <h6 className="title">+ {stat.label} </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SchoolStatistics;
