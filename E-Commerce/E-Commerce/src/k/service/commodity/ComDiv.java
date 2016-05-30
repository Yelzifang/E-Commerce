package k.service.commodity;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import k.dao.DBO;

/**
 * Servlet implementation class ComDiv
 */
@WebServlet("/ComDiv")
public class ComDiv extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ComDiv() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");

		Connection con = null;
		CallableStatement cs = null;
		ResultSet rs = null;

		int pageno;
		int pagecount;

		pageno = Integer.valueOf(request.getParameter("pageno"));
		pagecount = Integer.valueOf(request.getParameter("pagecount"));

		boolean status = false;
		String detail = null;
		boolean isNext = false;
		JSONArray message_array = new JSONArray();
		JSONObject com_message = new JSONObject();
		JSONObject message;

		DBO db = new DBO();
		PrintWriter out = response.getWriter();

		try {
			con = db.getConn();

			if (con == null) {
				status = false;
				detail = "连接数据库失败";
				message_array = null;
			} else {

				cs = con.prepareCall("{ call pro_divi_com(?,?)}");
				cs.setInt(1, pageno);
				cs.setInt(2, pagecount);

				rs = cs.executeQuery();

				if (rs == null) {
					status = false;
					detail = "查询失败";
				}

				while (rs.next()) {

					status = true;
					detail = "查询成功";

					System.out.println(rs.getInt(1));
					message = new JSONObject();
					message.put("comid", rs.getInt(1));
					message.put("comname", rs.getString(2));
					message.put("comimage", rs.getString(4));

					message_array.put(message);

					isNext = true;
				}

				if (isNext) {
					com_message.put("status", status);
					com_message.put("detail", detail);
					com_message.put("message", message_array);

				} else {
					com_message.put("status", false);
					com_message.put("detail", "已经没有更多的商品");
				}

				System.out.println(com_message.toString());
				out.print(com_message);
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
