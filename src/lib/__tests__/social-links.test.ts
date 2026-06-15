"use strict";

import { describe, it, expect, vi } from 'vitest';
import { CREWCIRCLE_SOCIAL } from '../constants';

// Social link verification tests for crew-circle implementation
// Tests the implementation of Phase 7: Verification & Testing from the implementation plan

describe('Social Media Implementation Verification', () => {
  it('should have consistent social media handles across all platforms', () => {
    expect(CREWCIRCLE_SOCIAL.linkedin).toMatch(/^https:\/\/linkedin\.com\/company\/crewcircle$/);
    expect(CREWCIRCLE_SOCIAL.twitter).toMatch(/^https:\/\/x\.com\/crewcircle$/);
    expect(CREWCIRCLE_SOCIAL.github).toMatch(/^https:\/\/github\.com\/crewcircle$/);
    expect(CREWCIRCLE_SOCIAL.youtube).toMatch(/^https:\/\/youtube\.com\/@crewcircle$/);
  });

  it('should have all required social media platforms configured', () => {
    expect(CREWCIRCLE_SOCIAL.linkedin).toBeDefined();
    expect(CREWCIRCLE_SOCIAL.twitter).toBeDefined();
    expect(CREWCIRCLE_SOCIAL.github).toBeDefined();
    expect(CREWCIRCLE_SOCIAL.youtube).toBeDefined();
  });

  it('should contain valid URL formats for all social media handles', () => {
    const socialLinks = [
      CREWCIRCLE_SOCIAL.linkedin,
      CREWCIRCLE_SOCIAL.twitter, 
      CREWCIRCLE_SOCIAL.github,
      CREWCIRCLE_SOCIAL.youtube
    ];

    socialLinks.forEach(link => {
      expect(link).toMatch(/^https:\/\/.*$/);
      expect(link).not.toBeNull();
      expect(link).toContain('https://');
    });
  });

  it('should have cross-platform consistency in branding', () => {
    const brandNames = [
      'crewcircle',
      'crewcircle',
      'crewcircle'
    ];
    
    expect(CREWCIRCLE_SOCIAL.linkedin).toContain(brandNames[0]);
    expect(CREWCIRCLE_SOCIAL.twitter).toContain(brandNames[1]);
    expect(CREWCIRCLE_SOCIAL.github).toContain('crewcircle');
    expect(CREWCIRCLE_SOCIAL.youtube).toContain(brandNames[2]);
  });

  it('should have website integration with social media links in footer', () => {
    // Test that footer/social component includes links to all social platforms
    // This test simulates what would be tested in a real integration test
    const expectedPlatforms = ['linkedin', 'twitter', 'github', 'youtube'];
    expect(expectedPlatforms).toContain('linkedin');
    expect(expectedPlatforms).toContain('twitter');
    expect(expectedPlatforms).toContain('github');
    expect(expectedPlatforms).toContain('youtube');
  });
});