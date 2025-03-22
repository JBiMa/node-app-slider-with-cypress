describe("Swiper Gallery Test", function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit("http://localhost:3000");
    cy.get(".swiper-button-next").click();
    cy.get(".swiper-slide-active").should("contain", "United Kingdom");
  });
});

describe("Swiper Gallery Test", function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit("http://localhost:3000");
    cy.get(".swiper-button-next").click();
    cy.wait(2000);
    cy.get(".swiper-button-next").click({ force: true });
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "Paris");
  });
});

describe("Slider Navigation Controls", function () {
  it("Should allow users to move forward and backward between slides using navigation buttons", function () {
    cy.visit("http://localhost:3000");
    cy.get(".swiper-slide-active").invoke("text").as("firstSlideText");
    cy.get(".swiper-button-next").click();
    cy.wait(2000);
    cy.get(".swiper-slide-active").should("contain", "United Kingdom");
    cy.get(".swiper-button-prev").click();
    cy.wait(1000);
    cy.get("@firstSlideText").then((firstSlideText) => {
      cy.get(".swiper-slide-active")
        .invoke("text")
        .should("eq", firstSlideText);
    });
  });
});

describe("Slide Content Verification", function () {
  it("Should display correct title and description for each slide", function () {
    cy.visit("http://localhost:3000");
    cy.get(".swiper-slide-active .card-description h1").should(
      "have.text",
      "Rome"
    );
    cy.get(".swiper-slide-active .card-description p").should(
      "have.text",
      "Italy"
    );
    cy.get(".swiper-button-next").click();
    cy.wait(1000);
    cy.get(".swiper-slide-active .card-description h1").should(
      "have.text",
      "London"
    );
    cy.get(".swiper-slide-active .card-description p").should(
      "have.text",
      "United Kingdom"
    );
    cy.get(".swiper-button-next").click();
    cy.wait(1000);
    cy.get(".swiper-slide-active .card-description h1").should(
      "have.text",
      "Paris"
    );
    cy.get(".swiper-slide-active .card-description p").should(
      "have.text",
      "France"
    );
  });

  describe("Responsive Gallery Behavior", function () {
    const devices = [
      { name: "desktop", width: 1920, height: 1080 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "mobile", width: 375, height: 667 },
    ];

    devices.forEach((device) => {
      it(`Should display correctly on ${device.name} (${device.width}x${device.height})`, function () {
        cy.viewport(device.width, device.height);
        cy.visit("http://localhost:3000");

        cy.get(".swiper").should("be.visible");
        cy.get(".swiper-button-next").should("be.visible");
        cy.get(".swiper-button-prev").should("be.visible");

        cy.get(".swiper-slide-active .card-description h1").should(
          "be.visible"
        );
        cy.get(".swiper-slide-active .card-description p").should("be.visible");

        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active").should("contain", "United Kingdom");

        cy.get(".swiper-button-prev").click();
        cy.wait(1000);
        cy.get(".swiper-slide-active").should("contain", "Rome");
      });
    });

    it("Should maintain proper layout proportions on different screen sizes", function () {
      devices.forEach((device) => {
        cy.viewport(device.width, device.height);
        cy.visit("http://localhost:3000");

        cy.get(".swiper").then(($swiper) => {
          const containerWidth = $swiper.width();
          const containerHeight = $swiper.height();
          const aspectRatio = containerWidth / containerHeight;

          expect(aspectRatio).to.be.closeTo(3 / 4, 0.1);
        });

        cy.get(".swiper-button-next").click();
        cy.wait(1000);
        cy.get(".swiper-button-next").should("be.visible");
      });
    });
  });

  it("Should have visible navigation controls", function () {
    cy.visit("http://localhost:3000");
    cy.get(".swiper-button-next").should("be.visible");
    cy.get(".swiper-button-prev").should("be.visible");
    cy.get(".swiper-pagination").should("exist");
    cy.get(".swiper").should("be.visible");
    cy.get(".swiper-slide").should("have.length", 3);
  });
});
