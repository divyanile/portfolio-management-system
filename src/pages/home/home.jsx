import React from "react";
import "./home.css";
import { blogs } from "./blogData.js";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Home</h1>

      {/* Info cards */}
      <div className="info-cards">
        <div className="info-card">
          <h3>Get started</h3>
          <p>Read our getting started guide to get the most out of your subscription.</p>
        </div>
        <div className="info-card">
          <h3>Community</h3>
          <p>Join the conversation on our exclusive Slack community.</p>
        </div>
        <div className="info-card">
          <h3>Visit website</h3>
          <p>Keep up with our latest content on our website.</p>
        </div>
      </div>

      {/* Blog posts */}
      <h2 className="section-title">Latest Posts</h2>
      <div className="blogs-container">
        {blogs.map((blog, idx) => (
          <div className="blog-card" key={idx}>
            <div className="blog-date">{blog.date}</div>
            <div className="blog-title">{blog.title}</div>
            <div className="blog-description">{blog.description}</div>
            <a href={blog.link} className="blog-link">Read full post</a>
          </div>
        ))}
      </div>
    </div>
  );
}
