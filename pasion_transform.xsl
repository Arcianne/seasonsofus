<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/portfolio">
  <html>
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Dessiree Camille - Portfolio</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f2f4f8;
            color: #222;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          }
          header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 18px;
            margin-bottom: 24px;
          }
          .name {
            font-size: 28px;
            color: #007bff;
            font-weight: 700;
          }
          .contact {
            margin-top: 8px;
            color: #444;
          }
          .contact a {
            color: #007bff;
            margin-left: 8px;
            text-decoration: none;
          }
          section {
            margin-top: 20px;
            border-bottom: 2px solid #077bff;
          }
          h2 {
            color: #007bff;
            font-size: 20px;
            margin-bottom: 12px;
          }
          .card {
            background: #fafafa;
            padding: 16px;
            border-radius: 6px;
            border: 1px solid #e0e0e0ff;
          }
          .skills-grid {
            display: flex;
            gap: 20px;
            align-items: flex-start;
          }
          .skills-column {
            flex: 1;
            min-width: 0;
          }
          .skills-column h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
            color: #333;
          }
          ul.skills-list {
            margin: 0;
            padding-left: 18px;
          }
          li.skill-item {
            margin-bottom: 8px;
          }
          .project {
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px dashed #e6e6e6;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <xsl:for-each select="student">
            <header>
              <div class="name">
                <xsl:value-of select="personal/firstname"/> <xsl:text> </xsl:text>
                <xsl:if test="string-length(normalize-space(personal/middleinitial)) &gt; 0">
                  <xsl:value-of select="concat(personal/middleinitial, ' ')"/>
                </xsl:if>
                <xsl:value-of select="personal/lastname"/>
              </div>

              <div class="contact">
                <xsl:value-of select="personal/course"/>
                <br/>
                <a href="mailto:{normalize-space(personal/email)}">Email</a>
                <xsl:if test="string-length(normalize-space(personal/linkedin)) &gt; 0">
                  <a href="{normalize-space(personal/linkedin)}" target="_blank">LinkedIn</a>
                </xsl:if>
                <xsl:if test="string-length(normalize-space(personal/github)) &gt; 0">
                  <a href="{normalize-space(personal/github)}" target="_blank">GitHub</a>
                </xsl:if>
              </div>

              <div class="bio" style="margin-top:12px;">
                <xsl:value-of select="normalize-space(personal/bio)"/>
              </div>
            </header>

            <xsl:if test="education/degree">
              <section>
                <h2>Education</h2>
                <div class="card">
                  <xsl:for-each select="education/degree">
                    <div style="margin-bottom:10px;">
                      <strong><xsl:value-of select="program"/></strong> — <xsl:value-of select="institution"/>
                      <div><em><xsl:value-of select="level"/></em>
                        <xsl:if test="string-length(normalize-space(year_graduated)) &gt; 0">
                          • Graduated: <xsl:value-of select="year_graduated"/>
                        </xsl:if>
                      </div>
                    </div>
                  </xsl:for-each>
                </div>
              </section>
            </xsl:if>

            <section>
              <h2>Skills</h2>
              <div class="card">
                <div class="skills-grid">
                  <div class="skills-column">
                    <xsl:if test="skills/hard/skill">
                      <h3>Hard skills</h3>
                      <ul class="skills-list">
                        <xsl:for-each select="skills/hard/skill">
                          <li class="skill-item"><xsl:value-of select="normalize-space(.)"/></li>
                        </xsl:for-each>
                      </ul>
                    </xsl:if>
                  </div>

                  <div class="skills-column">
                    <xsl:if test="skills/soft/skill">
                      <h3>Soft skills</h3>
                      <ul class="skills-list">
                        <xsl:for-each select="skills/soft/skill">
                          <li class="skill-item"><xsl:value-of select="normalize-space(.)"/></li>
                        </xsl:for-each>
                      </ul>
                    </xsl:if>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Projects</h2>
              <div class="card">
                <xsl:for-each select="projects/project">
                  <div class="project">
                    <div class="project-title"><strong><xsl:value-of select="title"/></strong></div>
                    <div><em><xsl:value-of select="role"/> • <xsl:value-of select="year"/></em></div>
                    <div><xsl:value-of select="description"/></div>
                    <div><small>Technologies: <xsl:value-of select="technologies"/></small></div>
                    <xsl:if test="string-length(normalize-space(link)) &gt; 0">
                      <div>TrueHue Website: <a href="{normalize-space(link)}" target="_blank"><xsl:value-of select="link"/></a></div>
                    </xsl:if>
                  </div>
                </xsl:for-each>
              </div>
            </section>

            <section>
              <h2>Organizations</h2>
              <div class="card">
                <ul>
                  <xsl:for-each select="organization/org">
                    <li>
                      <strong><xsl:value-of select="name"/></strong>
                      <xsl:if test="string-length(normalize-space(role)) &gt; 0"> — <xsl:value-of select="role"/></xsl:if>
                      <xsl:if test="string-length(normalize-space(years)) &gt; 0"> (<xsl:value-of select="years"/>)</xsl:if>
                    </li>
                  </xsl:for-each>
                </ul>
              </div>
            </section>

          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>