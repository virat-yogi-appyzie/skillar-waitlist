import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica'
  },
  headerContainer: {
    marginBottom: 30
  },
  logoContainer: {
    marginBottom: 15
  },
  title: {
    fontSize: 22,
    fontWeight: 700
  },
  preparedFor: {
    fontSize: 12,
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 600
  },
  content: {
    fontSize: 12,
    lineHeight: 1.6
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey'
  }
})

export const ReportTemplate = ({
  name,
  diagnosis,
  bottleneck,
  solution
}: {
  name: string
  diagnosis: string
  bottleneck: string
  solution: string
}) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={"https://app.skillar.ai/_next/static/media/full-skillar-logo.7cccab6b.svg"}
            style={{ width: 140 }}
          />
        </View>

        <Text style={styles.title}>
          Strategic Transformation Report
        </Text>
      </View>

      <Text style={styles.preparedFor}>
        Prepared For: {name}
      </Text>

      <Text style={styles.sectionTitle}>
        1. Strategic Diagnosis
      </Text>
      <Text style={styles.content}>
        {diagnosis}
      </Text>

      <Text style={styles.sectionTitle}>
        2. Organizational Bottleneck
      </Text>
      <Text style={styles.content}>
        {bottleneck}
      </Text>

      <Text style={styles.sectionTitle}>
        3. Strategic Solution
      </Text>
      <Text style={styles.content}>
        {solution}
      </Text>

      <View style={styles.footer}>
        <Text>
          © 2026 Skillar. Confidential & Proprietary.
        </Text>
      </View>

    </Page>
  </Document>
)