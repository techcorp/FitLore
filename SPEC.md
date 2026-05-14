# FitLore - AI Outfit Analysis Platform

## Project Overview

**Project Name:** FitLore
**Project Type:** Web Application (Frontend-only, API-integrated)
**Core Functionality:** Users upload outfit images, select styling options, and receive AI-powered fashion analysis with scores, color palettes, and recommendations.
**Target Users:** Fashion-conscious individuals seeking outfit feedback and style guidance.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Fonts:** Manrope (primary), Playfair Display (accents)
- **Animations:** Framer Motion + CSS transitions
- **State Management:** React useState/useReducer + localStorage
- **Image Handling:** File API + Object URLs

---

## Design System

### Color Palette

```css
--color-bg-primary: #FAF9F7;        /* Warm off-white */
--color-bg-secondary: #F3F1ED;       /* Soft cream */
--color-bg-card: #FFFFFF;           /* Pure white cards */
--color-text-primary: #1A1A1A;       /* Near black */
--color-text-secondary: #6B6B6B;     /* Muted grey */
--color-text-tertiary: #9A9A9A;      /* Light grey */
--color-accent: #C9A962;            /* Muted gold */
--color-accent-hover: #B8954F;       /* Darker gold */
--color-border: #E8E6E1;             /* Soft border */
--color-success: #4A7C59;            /* Forest green */
--color-warning: #D4A574;            /* Warm amber */
--color-error: #B85C5C;             /* Muted red */

/* Score Colors */
--score-excellent: #4A7C59;
--score-good: #6B9E78;
--score-average: #D4A574;
--score-below: #C9896D;
--score-poor: #B85C5C;
```

### Typography

- **Headings:** Manrope, font-weight 600-700
  - H1: 48px (mobile: 32px)
  - H2: 36px (mobile: 24px)
  - H3: 24px (mobile: 20px)
  - H4: 18px
- **Body:** Manrope, font-weight 400-500
  - Large: 18px
  - Regular: 16px
  - Small: 14px
  - Tiny: 12px

### Spacing System

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Visual Effects

- Card shadows: `0 4px 24px rgba(0, 0, 0, 0.06)`
- Hover shadows: `0 8px 32px rgba(0, 0, 0, 0.1)`
- Border radius: 16px (cards), 12px (buttons), 8px (inputs)
- Transitions: 300ms ease-out

---

## Page Specifications

### 1. Landing Page (/)

**Layout:**
- Fixed navbar with logo (left), nav links (center), CTA (right)
- Hero section full viewport height
- Features section with 2x3 grid
- How It Works section with 3-step horizontal flow
- Footer with brand and minimal links

**Navbar:**
- Logo: "FitLore" in Playfair Display + Manrope combination
- Links: Features, How It Works, About
- CTA Button: "Analyze Outfit" → /analyze

**Hero Section:**
- Background: Subtle gradient overlay on abstract geometric pattern
- Headline: "Upload Your Outfit. Get an Instant AI Style Review."
- Subheadline: Explains AI analyzes styling, season, occasion, color harmony, improvements
- Primary CTA: "Analyze My Outfit" (large, gold accent)
- Secondary: "See How It Works" (text link)
- Preview cards: 3 floating cards showing mock analysis snippets
  - Score card (82/100)
  - Color palette preview
  - Suggestion card

**Features Section:**
- Section title: "What FitLore Analyzes"
- 6 feature cards in 3x2 grid:
  1. Outfit Scoring - overall rating with breakdown
  2. Season Suitability - weather-appropriate analysis
  3. Occasion Matching - event-appropriateness
  4. Color Harmony - palette compatibility
  5. Styling Suggestions - improvement tips
  6. Accessories & Footwear - complete look recommendations
- Each card: Icon, title, short description

**How It Works Section:**
- Section title: "Three Simple Steps"
- Three steps with connecting line/dots:
  1. "Upload Image" - drag & drop illustration
  2. "Select Context" - season, occasion, style
  3. "Get Analysis" - receive complete report
- Minimal number indicators

**Footer:**
- Brand name + tagline
- Copyright
- Links: Privacy, Terms, Contact

---

### 2. Outfit Analysis Form Page (/analyze)

**Layout:**
- Split layout: Form on left, preview/info on right
- Mobile: Stacked vertically

**Form Components:**

*Image Upload Section:*
- Large drop zone with dashed border
- Icon: cloud upload
- Text: "Drop your outfit image here" + supported formats
- Drag-and-drop support
- Click to browse fallback
- Preview state: Shows image thumbnail with remove button
- Replace functionality

*Season Dropdown:*
- Label: "Season"
- Options: Summer, Winter, Spring, Autumn/Fall, Rainy/Monsoon, All-season/Indoor
- Custom styled select with chevron icon

*Occasion Dropdown:*
- Label: "Occasion"
- Options: Office/Work, Business Meeting, Casual Day Out, Dinner/Date, Wedding/Formal Event, Party/Night Out, Travel, Religious/Cultural Event, University/College, Sports/Outdoor Activity

*Style Preference Dropdown:*
- Label: "Style Preference"
- Options: Balanced/Professional, Minimal, Streetwear, Formal, Smart Casual, Modest, Trendy/Fashion-Forward

*Extra Notes Textarea:*
- Label: "Additional Notes"
- Placeholder: "I want this outfit to look more premium, more formal, or better for hot weather."
- Character count optional

*Submit Button:*
- Text: "Analyze Outfit"
- Disabled state while processing
- Full width on mobile

**Behavior:**
- Client-side validation before submit
- Loading state shows animated loader + messages
- Form submission as multipart/form-data
- Redirect to results page on success

---

### 3. Analysis Result Page (/result)

**Layout:**
- Header with back button and "Analyze Another"
- Main content: uploaded image + analysis cards

**Components:**

*Header:*
- Back to home button
- "Analyze Another Outfit" button
- Optional: Share / Download buttons (UI only)

*Image Preview:*
- Large preview of uploaded outfit
- Subtle border and shadow

*Overall Score Card:*
- Large circular score display
- Score: 0-100
- Rating label: Poor/Below Average/Average/Good/Very Good/Excellent
- Color-coded based on score

*Summary Card:*
- Short verdict paragraph

*Analysis Cards Grid:*
- Season Fit: score + comments
- Occasion Fit: score + comments
- Color Harmony: score + main colors + comments

*Detected Items:*
- List of outfit pieces detected

*Color Palette Section:*
- Title: "Recommended Color Palette"
- Grid of color swatches
- Each swatch: color block, name, hex code, "how to use" text

*Strengths:*
- Bulleted list

*Improvements:*
- Bulleted list

*Suggestions Section:*
- Styling suggestions
- Accessory suggestions
- Footwear suggestions
- Shopping keywords (clickable chips, copyable)

*Final Verdict:*
- Prominent quote-style box

**Empty State (no data):**
- Friendly illustration
- "No analysis found" message
- "Upload an Outfit" CTA

---

### 4. Loading State

**Display:**
- Centered content
- Animated gradient ring/spinner
- Rotating tips messages cycling every 2 seconds
- Messages:
  - "Analyzing outfit composition..."
  - "Checking color harmony..."
  - "Evaluating season suitability..."
  - "Reviewing occasion match..."
  - "Preparing your fashion report..."

---

## Component Structure

```
/app
  /layout.tsx          # Root layout with fonts
  /page.tsx            # Landing page
  /analyze/page.tsx    # Form page
  /result/page.tsx     # Results page
/components
  /ui
    /Button.tsx        # Reusable button
    /Select.tsx       # Custom dropdown
    /Input.tsx        # Form inputs
    /Card.tsx         # Card wrapper
    /Badge.tsx        # Score badges
  /layout
    /Navbar.tsx       # Navigation
    /Footer.tsx       # Footer
    /Container.tsx    # Max-width wrapper
  /features
    /Hero.tsx         # Landing hero
    /FeaturesGrid.tsx # Features section
    /HowItWorks.tsx   # Process steps
    /ImageUpload.tsx  # File upload component
    /ScoreDisplay.tsx # Circular score
    /ColorPalette.tsx # Color swatches
    /AnalysisCard.tsx # Result cards
    /LoadingState.tsx # Loading spinner
/lib
  /api.ts             # API integration
  /types.ts           # TypeScript types
  /utils.ts           # Helper functions
/styles
  /globals.css        # Global styles + Tailwind
```

---

## API Integration

**Endpoint:** `https://n8n.imaginationai.net/webhook/12da452c-644b-44bf-a70a-9d1022b701cc`

**Request (multipart/form-data):**
```
outfitImage: File
season: string
occasion: string
stylePreference: string
extraNotes: string
```

**Response:**
```json
{
  "analysis": {
    "overall_score": 82,
    "rating_label": "Very good",
    "outfit_summary": "string",
    "detected_items": ["string"],
    "season_fit": { "score": 78, "comments": "string" },
    "occasion_fit": { "score": 88, "comments": "string" },
    "color_analysis": {
      "main_colors": ["string"],
      "harmony_score": 84,
      "comments": "string"
    },
    "color_palette": [
      { "name": "string", "hex": "#000000", "how_to_use": "string" }
    ],
    "strengths": ["string"],
    "improvements": ["string"],
    "styling_suggestions": ["string"],
    "accessory_suggestions": ["string"],
    "footwear_suggestions": ["string"],
    "shopping_keywords": ["string"],
    "final_verdict": "string"
  }
}
```

**State Management:**
- Use localStorage to persist:
  - `fitlore_image`: base64 or URL of uploaded image
  - `fitlore_result`: JSON response from API

---

## Acceptance Criteria

### Landing Page
- [ ] Navbar displays correctly with logo and links
- [ ] Hero section shows headline, subheadline, CTA
- [ ] Feature cards display in 3x2 grid on desktop
- [ ] How It Works shows 3 steps
- [ ] Footer shows brand and links
- [ ] Responsive on mobile/tablet/desktop
- [ ] Smooth hover effects on interactive elements

### Form Page
- [ ] Image upload accepts drag-drop and click
- [ ] Image preview shows after selection
- [ ] All dropdowns have correct options
- [ ] Form validates required fields
- [ ] Submit button disabled while loading
- [ ] Loading state shows with rotating tips
- [ ] Form submits to webhook URL via multipart/form-data

### Results Page
- [ ] Displays uploaded image
- [ ] Shows overall score with rating label
- [ ] Displays all analysis cards (season, occasion, color)
- [ ] Color palette shows swatches with hex and usage
- [ ] Lists strengths, improvements, suggestions
- [ ] Shows final verdict
- [ ] Empty state when no data
- [ ] "Analyze Another" button works

### General
- [ ] No console errors
- [ ] Tailwind styles apply correctly
- [ ] Animations are smooth (60fps)
- [ ] Mobile responsive at all breakpoints
- [ ] Premium, fashion-tech aesthetic achieved