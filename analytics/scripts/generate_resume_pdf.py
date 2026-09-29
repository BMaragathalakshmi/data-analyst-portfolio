import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_resume_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Custom typography matching the resume
    header_name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=21,
        alignment=TA_CENTER,
        textColor=HexColor('#000000')
    )

    header_sub_style = ParagraphStyle(
        'HeaderSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#222222')
    )

    header_link_style = ParagraphStyle(
        'HeaderLink',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=HexColor('#0056b3')
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=HexColor('#000000'),
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        alignment=TA_JUSTIFY,
        textColor=HexColor('#1a1a1a')
    )

    body_bold = ParagraphStyle(
        'BodyBoldCustom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=HexColor('#000000')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=HexColor('#1a1a1a')
    )

    story = []

    # 1. Header
    story.append(Paragraph("<b>MARAGATHALAKSHMI B</b>", header_name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Dindigul, Tamil Nadu, India &nbsp;|&nbsp; 9025780017 &nbsp;|&nbsp; maragathalakshmi4@gmail.com", header_sub_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph('<a href="https://linkedin.com/in/maragathalakshmi-b-3671082b7"><u>linkedin.com/in/maragathalakshmi-b-3671082b7</u></a> &nbsp;|&nbsp; <a href="https://lighthearted-babka-8a1319.netlify.app"><u>Portfolio</u></a>', header_link_style))
    story.append(Spacer(1, 7))

    def add_section_header(title):
        story.append(Paragraph(f"<b>{title}</b>", section_heading_style))
        story.append(Spacer(1, 1.5))
        story.append(HRFlowable(width="100%", thickness=0.75, color=HexColor("#333333"), spaceBefore=1, spaceAfter=4))

    # 2. Career Objective
    add_section_header("CAREER OBJECTIVE")
    story.append(Paragraph("Electronics & Communication Engineering student with hands-on experience in Python, web development and a growing focus on data analytics. Seeking an entry-level Data Analyst role to apply skills in data cleaning, exploratory analysis and visualization to turn data into actionable business insights.", body_style))
    story.append(Spacer(1, 6))

    # 3. Education
    add_section_header("EDUCATION")
    edu_data = [
        [
            Paragraph("<b>Bachelor of Engineering - Electronics & Communication Engineering</b>", body_style),
            Paragraph("<b>2022 - Present</b>", ParagraphStyle('RightText', parent=body_style, alignment=2))
        ],
        [
            Paragraph("NPR College of Engineering and Technology, Dindigul &nbsp;|&nbsp; CGPA: 7.44", body_style),
            ""
        ],
        [
            Paragraph("<b>Higher Secondary (HSC)</b>", body_style),
            ""
        ],
        [
            Paragraph("St. Joseph Girls Higher Secondary School, Dindigul &nbsp;|&nbsp; 81%", body_style),
            ""
        ],
        [
            Paragraph("<b>Secondary School Leaving Certificate (SSLC)</b>", body_style),
            ""
        ],
        [
            Paragraph("St. Joseph Girls Higher Secondary School, Dindigul &nbsp;|&nbsp; 74%", body_style),
            ""
        ]
    ]
    edu_table = Table(edu_data, colWidths=[420, 120])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 6))

    # 4. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills_text = """
    <b>Programming Languages:</b> Python, C, C++<br/>
    <b>Data Analytics:</b> Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization, Statistical Analysis, Dashboard Reporting<br/>
    <b>Analytics Tools & Libraries:</b> SQL, Microsoft Excel, Power BI, Tableau, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook<br/>
    <b>Web Development:</b> HTML, CSS, JavaScript<br/>
    <b>Networking & IoT:</b> Cisco Networking, IoT<br/>
    <b>Core Skills:</b> Problem Solving, Troubleshooting, Debugging, Analytical Thinking, Teamwork
    """
    story.append(Paragraph(skills_text, body_style))
    story.append(Spacer(1, 6))

    # 5. Internship
    add_section_header("INTERNSHIP")
    intern_data = [
        [
            Paragraph("<b>Full Stack Development Intern - VCodez, Chennai</b>", body_style),
            Paragraph("<b>3 Months</b>", ParagraphStyle('RightText2', parent=body_style, alignment=2))
        ]
    ]
    intern_table = Table(intern_data, colWidths=[420, 120])
    intern_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(intern_table)
    
    intern_bullets = [
        "Built a front-end mini project using HTML, CSS and JavaScript, applying client-side interaction design.",
        "Collaborated with team members to understand real-world web application deployment.",
        "Strengthened debugging and problem-solving skills through hands-on development tasks."
    ]
    for b in intern_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1))
    story.append(Spacer(1, 5))

    # 6. Academic Projects
    add_section_header("ACADEMIC PROJECTS")
    proj_data = [
        [
            Paragraph("<b>Online Food Ordering System (Front-End)</b>", body_style),
            Paragraph("<i>HTML, CSS, JavaScript</i>", ParagraphStyle('RightText3', parent=body_style, alignment=2))
        ]
    ]
    proj_table = Table(proj_data, colWidths=[380, 160])
    proj_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(proj_table)
    proj_bullets = [
        "Designed a responsive interface allowing users to browse food items, select items and place mock orders.",
        "Applied UI/UX principles to improve usability and performance."
    ]
    for b in proj_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1))
    story.append(Spacer(1, 5))

    # 7. Workshops & Hackathons
    add_section_header("WORKSHOPS & HACKATHONS")
    workshops = [
        "<b>NPR 36-Hour Hackathon 2023</b> - Participated in an innovation challenge to build creative technical solutions.",
        "<b>Smartphone Debugging and Troubleshooting Workshop</b> - Hands-on learning of smartphone hardware and software problem solving."
    ]
    for w in workshops:
        story.append(Paragraph(f"• &nbsp; {w}", bullet_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 5))

    # 8. Personal Details
    add_section_header("PERSONAL DETAILS")
    personal_text = """
    <b>Languages Known:</b> English, Tamil<br/>
    <b>Date of Birth:</b> 04-12-2004
    """
    story.append(Paragraph(personal_text, body_style))
    story.append(Spacer(1, 5))

    # 9. Declaration
    add_section_header("DECLARATION")
    story.append(Paragraph("I hereby declare that the above information is true to the best of my knowledge and belief.", body_style))

    doc.build(story)
    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    os.makedirs("public", exist_ok=True)
    build_resume_pdf("public/MARAGATHALAKSHMI_B_Resume.pdf")
    build_resume_pdf("public/resume.pdf")
