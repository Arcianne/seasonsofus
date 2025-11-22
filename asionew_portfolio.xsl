<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <!-- Match root -->
    <xsl:template match="/studentPortfolio">
        <html>
        <head>
            <title>Student Portfolio</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    padding: 0;
                    line-height: 1.6;
                }

                h1, h2 {
                    font-weight: normal;
                    border-bottom: 1px solid #000;
                    padding-bottom: 5px;
                    margin-bottom: 10px;
                }

                .section {
                    margin-bottom: 30px;
                }

                .skill {
                    display: inline-block;
                    margin-right: 10px;
                }

                .project {
                    margin-bottom: 10px;
                }

                .label {
                    font-weight: bold;
                }
            </style>
        </head>

        <body>

            <!-- PERSONAL INFO -->
            <div class="section">
                <h1>Student Information</h1>
                <p><span class="label">Name:</span> <xsl:value-of select="student/personalInfo/name"/></p>
                <p><span class="label">Email:</span> <xsl:value-of select="student/personalInfo/email"/></p>
                <p><span class="label">Program:</span> <xsl:value-of select="student/personalInfo/program"/></p>
                <p><span class="label">About:</span> <xsl:value-of select="student/personalInfo/about"/></p>
            </div>

            <!-- SKILLS -->
            <div class="section">
                <h2>Skills</h2>
                <xsl:for-each select="student/skills/skill">
                    <p class="skill">• <xsl:value-of select="."/></p>
                </xsl:for-each>
            </div>

            <!-- PROJECTS -->
            <div class="section">
                <h2>Projects</h2>
                <xsl:for-each select="student/projects/project">
                    <div class="project">
                        <p class="label"><xsl:value-of select="title"/></p>
                        <p><xsl:value-of select="description"/></p>
                    </div>
                </xsl:for-each>
            </div>

            <!-- CONTACT -->
            <div class="section">
                <h2>Contact</h2>
                <p><span class="label">Email:</span> <xsl:value-of select="student/contact/email"/></p>
                <p><span class="label">GitHub:</span> <xsl:value-of select="student/contact/socials/github"/></p>
            </div>

        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
