import { describe, it, expect } from "vitest";
import { FLAGSHIP_PROJECTS } from "../lib/data/projects-data";
import { SKILLS_DATA } from "../lib/data/skills-data";
import { SQL_PRESETS, EXCEL_FORMULAS } from "../lib/data/labs-data";

describe("Data Pulse Portfolio Integrity Tests", () => {
  it("should define all 4 flagship projects with complete 8-stage pipelines", () => {
    expect(FLAGSHIP_PROJECTS.length).toBe(4);

    const slugs = FLAGSHIP_PROJECTS.map((p) => p.slug);
    expect(slugs).toContain("retail-sales");
    expect(slugs).toContain("customer-retention");
    expect(slugs).toContain("workforce-hr");
    expect(slugs).toContain("ecommerce-operations");

    FLAGSHIP_PROJECTS.forEach((project) => {
      expect(project.stages.length).toBe(8);
      expect(project.heroStats.length).toBeGreaterThanOrEqual(4);
      expect(project.keyFindings.length).toBeGreaterThan(0);
      expect(project.recommendations.length).toBeGreaterThan(0);
    });
  });

  it("should contain authentic, verified skills with valid categories and levels", () => {
    expect(SKILLS_DATA.length).toBeGreaterThanOrEqual(8);

    const validLevels = ["Learning", "Practicing", "Project Experience"];
    SKILLS_DATA.forEach((skill) => {
      expect(validLevels).toContain(skill.level);
      expect(skill.tools.length).toBeGreaterThan(0);
      expect(skill.keyConcepts.length).toBeGreaterThan(0);
    });
  });

  it("should contain structured SQL and Excel presets for interactive labs", () => {
    expect(SQL_PRESETS.length).toBeGreaterThanOrEqual(5);
    expect(EXCEL_FORMULAS.length).toBeGreaterThanOrEqual(4);

    SQL_PRESETS.forEach((preset) => {
      expect(preset.sql).toContain("SELECT");
    });
  });
});
