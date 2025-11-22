<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/portfolio">
        <html>
        <head>
            <title>Student Portfolio - <xsl:value-of select="student/lastname"/></title>
            <style>
                body { font-family: Arial; background:#fff9f8; padding:20px; }
                h1 { color:#ff6f91; }
                h2 { color:#ff6f91; border-bottom:1px solid #ccc; padding-bottom:5px; }
                .skill { background:#ffe066; padding:5px 12px; border-radius:15px; margin:4px; display:inline-block; }
                .project { background:white; padding:15px; border-radius:10px; margin:10px 0; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
            </style>
        </head>

        <body>
            <h1><xsl:value-of select="student/firstname"/> <xsl:value-of select="student/lastname"/></h1>
            <p><strong>Course:</strong> <xsl:value-of select="student/course"/></p>
            <p><strong>Year Level:</strong> <xsl:value-of select="student/yearlevel"/></p>

            <h2>About Me</h2>
            <p><xsl:value-of select="about"/></p>

            <h2>Skills</h2>
            <div>
                <xsl:for-each select="skills/skill">
                    <span class="skill"><xsl:value-of /></span>
                </xsl:for-each>
            </div>

            <h2>Projects</h2>
            <xsl:for-each select="projects/project">
                <div class="project">
                    <h3><xsl:value-of select="title"/></h3>
                    <p><xsl:value-of select="description"/></p>
                </div>
            </xsl:for-each>

            <h2>Contact</h2>
            <p>Email: <xsl:value-of select="contact/email"/></p>
            <p>GitHub: <xsl:value-of select="contact/github"/></p>

        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
